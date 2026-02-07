import React, { useEffect, useMemo, useState } from 'react';
import styles from './GatePassPage.module.css';
import { createGatePass, getMyGatePasses } from '../api/gatepassApi';

function combineDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  // Combine to ISO string acceptable by backend (LocalDateTime)
  // Using 'T' separator without timezone
  return `${dateStr}T${timeStr}:00`;
}

export default function GatePassPage() {
  const [profile] = useState({
    name: 'User',
    parentName: "User's Parent Name",
    rollNo: 'Roll number',
    course: '2023-CUP-BE-CSE',
  });

  const [applyDate, setApplyDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [leaveType, setLeaveType] = useState('Day Out');
  const [outDate, setOutDate] = useState('');
  const [outTime, setOutTime] = useState('');
  const [inDate, setInDate] = useState('');
  const [inTime, setInTime] = useState('');
  const [reason, setReason] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [approvedBy, setApprovedBy] = useState('');

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyGatePasses();
        setHistory(data || []);
      } catch (e) {
        // ignore for now
      }
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const fromDT = combineDateTime(outDate, outTime);
    const toDT = combineDateTime(inDate, inTime);

    if (!fromDT || !toDT || !reason) {
      setMessage('Please fill out required fields.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        reason: `${reason}${leaveType ? ` (${leaveType})` : ''}`,
        fromDatetime: fromDT,
        toDatetime: toDT,
      };
      await createGatePass(payload);
      setMessage('Gate pass submitted.');
      // refresh history
      const data = await getMyGatePasses();
      setHistory(data || []);
      // reset minimal fields
      setReason('');
      setOutDate('');
      setOutTime('');
      setInDate('');
      setInTime('');
    } catch (e) {
      setMessage('Failed to submit gate pass.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <img src="/star programer.png" alt="avatar" className={styles.avatar} />
          <div>
            <h4>Hi, {profile.name}</h4>
            <p>{profile.parentName}</p>
            <p>{profile.rollNo}</p>
            <p>{profile.course}</p>
          </div>
        </div>

        <div className={styles.formCard}>
          <h5><b>Gatepass Request</b></h5>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="applyDate"><b>Apply Date</b></label>&nbsp;&nbsp;
              <input type="date" id="applyDate" value={applyDate} onChange={(e) => setApplyDate(e.target.value)} />
            </div>

            <div className="mb-3">
              <label><b>Apply For</b></label>&nbsp;&nbsp;
              <input type="radio" name="leaveType" id="dayOut" checked={leaveType==='Day Out'} onChange={() => setLeaveType('Day Out')} />
              <label htmlFor="dayOut">Day Out</label>&nbsp;&nbsp;
              <input type="radio" name="leaveType" id="nightOut" checked={leaveType==='Night Out'} onChange={() => setLeaveType('Night Out')} />
              <label htmlFor="nightOut">Night Out</label>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="leaveFrom"><b>Out Date</b></label><br />
                <input type="date" id="leaveFrom" value={outDate} onChange={(e) => setOutDate(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="outTime"><b>Out Time (approx)</b></label><br />
                <input type="time" id="outTime" value={outTime} onChange={(e) => setOutTime(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="leaveTo"><b>In Date</b></label><br />
                <input type="date" id="leaveTo" value={inDate} onChange={(e) => setInDate(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="inTime"><b>In Time (approx)</b></label><br />
                <input type="time" id="inTime" value={inTime} onChange={(e) => setInTime(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="leaveReason"><b>Leave Required Reason</b></label>
              <select className="form-select" id="leaveReason" value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select Reason</option>
                <option value="Medical">Medical</option>
                <option value="Personal">Personal</option>
                <option value="Family">Family</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="hostelName"><b>Hostel Name</b></label>
              <select className="form-select" id="hostelName" value={hostelName} onChange={(e) => setHostelName(e.target.value)}>
                <option value="">Select Hostel Name</option>
                <option>Nightingle A</option>
                <option>Pie A</option>
                <option>Pie B</option>
                <option>Pie C</option>
                <option>Vasco</option>
                <option>Columbus</option>
                <option>Marco polo</option>
                <option>Magellan</option>
                <option>Armstrong</option>
                <option>Darwin B</option>
                <option>IBN Batutta A</option>
                <option>IBN Batutta B</option>
                <option>Aristotle</option>
                <option>Archimedes</option>
                <option>Franklin</option>
                <option>IBN Battuta C</option>
                <option>Nightingle B</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="approvedBy"><b>Approved By</b></label><br />
              <input type="text" id="approvedBy" placeholder="Warden Name" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} />
            </div>

            {message && <div className={styles.message}>{message}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.history}>
        <h5><b>Gatepass History</b></h5>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>From → To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={h.id || idx}>
                <td>{idx + 1}</td>
                <td>{h.fromDatetime?.replace('T',' ')} → {h.toDatetime?.replace('T',' ')}</td>
                <td>{h.reason}</td>
                <td>{h.status}</td>
                <td>{h.approvedByUsername || '-'}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr><td colSpan={5}>No gatepass history</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import styles from './ComplaintForm.module.css';
import { createComplaint, getCategories } from '../api/complaintsApi';
import PageHeader from '../components/PageHeader';

export default function ComplaintForm({ heading = 'Complaint Form', presetCategoryName }) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
        if (data && data.length) {
          let initial = data[0];
          if (presetCategoryName) {
            const found = data.find(c => (c.name || '').toLowerCase().includes(presetCategoryName.toLowerCase()));
            if (found) initial = found;
          }
          setCategoryId(String(initial.id));
        }
      } catch (e) {
        // ignore
      }
    })();
  }, [presetCategoryName]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !description || !categoryId) {
      setMessage('Please fill required fields.');
      return;
    }

    try {
      setLoading(true);
      await createComplaint({ title, description, categoryId: Number(categoryId) });
      setMessage('Complaint submitted successfully!');
      setTitle('');
      setDescription('');
    } catch (e) {
      setMessage('Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <PageHeader title={heading} />
        <form onSubmit={onSubmit} className="section">
          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="name">Your Name</label>
              <input id="name" className={`form-control ${styles.input}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
            </div>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="rollNo">Roll Number</label>
              <input id="rollNo" className={`form-control ${styles.input}`} value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Enter your roll number" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input id="email" type="email" className={`form-control ${styles.input}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
            </div>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" className={`form-control ${styles.input}`} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="hostelName">Hostel Name</label>
              <input id="hostelName" className={`form-control ${styles.input}`} value={hostelName} onChange={(e) => setHostelName(e.target.value)} placeholder="Enter your hostel name" />
            </div>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="roomNumber">Room Number</label>
              <input id="roomNumber" className={`form-control ${styles.input}`} value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Enter your room number" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="category">Complaint Category</label>
              <select id="category" className={`form-select ${styles.select}`} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="title">Title</label>
              <input id="title" className={`form-control ${styles.input}`} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short title" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="description">Complaint</label>
              <textarea id="description" className={`form-control ${styles.textarea}`} rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your complaint in detail" />
            </div>
          </div>

          {message && <div className="alert alert-info mt-2">{message}</div>}
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="d-inline-flex align-items-center gap-2"><span className="spinner" /> Submitting...</span>
              ) : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

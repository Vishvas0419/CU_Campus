import React, { useEffect, useState } from 'react';
import styles from './ComplaintHistoryPage.module.css';
import { getMyComplaints } from '../api/complaintsApi';

export default function ComplaintHistoryPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMyComplaints();
        if (mounted) setComplaints(data || []);
      } catch (e) {
        setError('Failed to load complaints');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Complaints</h1>
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.empty}>{error}</p>}
        {!loading && !error && complaints.length === 0 && (
          <p className={styles.empty}>No complaints submitted yet.</p>
        )}
        {!loading && !error && complaints.map((c, idx) => (
          <div
            key={c.id || idx}
            className={`${styles.item} ${idx % 2 === 0 ? styles.itemOdd : styles.itemEven}`}
          >
            <h2 className={styles.heading}>{c.categoryName || 'General Complaint'}</h2>
            <p><strong>Title:</strong> {c.title}</p>
            <p><strong>Description:</strong> {c.description}</p>
            <p><strong>Status:</strong> {c.status}</p>
            {c.createdAt && (
              <p><strong>Created:</strong> {new Date(c.createdAt).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

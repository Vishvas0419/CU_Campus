import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { getMe, updateMe } from '../api/authApi';

export default function ProfilePage() {
  const [profile, setProfile] = useState({ fullName: '', email: '', hostel: '', enrollmentNo: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('/star programer.png');

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setProfile({
          fullName: me.fullName || '',
          email: me.email || '',
          hostel: me.hostel || '',
          enrollmentNo: me.enrollmentNo || '',
        });
      } catch (_) {
        // ignore
      }
    })();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await updateMe({ fullName: profile.fullName, hostel: profile.hostel });
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (_) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Profile</h2>
        <div className={styles.pic}><img src={preview} alt="Profile" /></div>
        {!editing ? (
          <>
            <div className={styles.info}>
              <p>{profile.fullName}</p>
              <p>{profile.email}</p>
              <p>{profile.hostel}</p>
              <p>{profile.enrollmentNo}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.button} onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="fullName">Name</label>
              <input id="fullName" className={styles.input} value={profile.fullName} onChange={(e)=>setProfile(p=>({...p, fullName:e.target.value}))} />
            </div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input id="email" type="email" className={styles.input} value={profile.email} onChange={(e)=>setProfile(p=>({...p, email:e.target.value}))} />
            </div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="hostel">Hostler/Day scholar</label>
              <input id="hostel" className={styles.input} value={profile.hostel} onChange={(e)=>setProfile(p=>({...p, hostel:e.target.value}))} />
            </div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="enrollment">Course/Department</label>
              <input id="enrollment" className={styles.input} value={profile.enrollmentNo} onChange={(e)=>setProfile(p=>({...p, enrollmentNo:e.target.value}))} />
            </div>
            <div className={styles.group}>
              <label className={styles.label} htmlFor="pic">Profile Picture</label>
              <input id="pic" type="file" accept="image/*" onChange={onFileChange} />
            </div>
            {message && <div className={styles.message}>{message}</div>}
            <button className={styles.button} type="submit">Save Changes</button>
            <div className={styles.actions}>
              <button type="button" className={styles.button} onClick={()=>{setEditing(false);setMessage('');}}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

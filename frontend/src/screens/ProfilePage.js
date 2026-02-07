import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/useAuth';
import * as authApi from '../api/authApi';

export default function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        enrollmentNo: user.enrollmentNo || '',
        hostel: user.hostel || ''
      });
    }
  }, [user, reset]);

  async function onSubmit(data) {
    setMsg(null);
    await authApi.updateMe(data);
    await refreshMe();
    setMsg('Profile updated');
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h3>Profile</h3>
      <div className="text-muted mb-3">Update your basic details.</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input className="form-control" {...register('fullName')} />
        </div>
        <div className="mb-3">
          <label className="form-label">Enrollment no</label>
          <input className="form-control" {...register('enrollmentNo')} />
        </div>
        <div className="mb-3">
          <label className="form-label">Hostel</label>
          <input className="form-control" {...register('hostel')} />
        </div>
        {msg && <div className="alert alert-success py-2">{msg}</div>}
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}


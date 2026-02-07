import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setError } = useForm();

  async function onSubmit(data) {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        fullName: data.fullName || null,
        enrollmentNo: data.enrollmentNo || null,
        hostel: data.hostel || null,
      });
      navigate('/dashboard');
    } catch (e) {
      setError('root', { message: 'Registration failed. Username/email may already exist.' });
    }
  }

  const password = watch('password');

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h3 className="mb-3">Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Username</label>
            <input className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: true })} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: true })} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: true, minLength: 8 })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register('confirmPassword', {
                required: true,
                validate: (v) => v === password || 'Passwords do not match',
              })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" {...register('fullName')} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Enrollment no</label>
            <input className="form-control" {...register('enrollmentNo')} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Hostel</label>
          <input className="form-control" {...register('hostel')} />
        </div>

        {errors.root && <div className="alert alert-danger py-2">{errors.root.message}</div>}
        <button className="btn btn-success w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <div className="mt-3">
        <span className="text-muted">Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}


import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

  async function onSubmit(data) {
    try {
      await login(data.username, data.password);
      navigate('/dashboard');
    } catch (e) {
      setError('root', { message: 'Invalid username or password' });
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: true })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: true })} />
        </div>
        {errors.root && <div className="alert alert-danger py-2">{errors.root.message}</div>}
        <button className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <div className="mt-3">
        <span className="text-muted">No account? </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}


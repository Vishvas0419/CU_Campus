import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as gatepassApi from '../api/gatepassApi';

export default function NewGatePassPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

  async function onSubmit(data) {
    try {
      await gatepassApi.createGatePass({
        reason: data.reason,
        fromDatetime: data.fromDatetime,
        toDatetime: data.toDatetime
      });
      navigate('/gatepass');
    } catch (e) {
      setError('root', { message: 'Failed to submit gate pass request' });
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h3>New Gate Pass</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <input className={`form-control ${errors.reason ? 'is-invalid' : ''}`} {...register('reason', { required: true })} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">From</label>
            <input
              type="datetime-local"
              className={`form-control ${errors.fromDatetime ? 'is-invalid' : ''}`}
              {...register('fromDatetime', { required: true })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">To</label>
            <input
              type="datetime-local"
              className={`form-control ${errors.toDatetime ? 'is-invalid' : ''}`}
              {...register('toDatetime', { required: true })}
            />
          </div>
        </div>
        {errors.root && <div className="alert alert-danger py-2">{errors.root.message}</div>}
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}


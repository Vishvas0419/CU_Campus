import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as complaintsApi from '../api/complaintsApi';

export default function NewComplaintPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    complaintsApi.getCategories().then(setCategories);
  }, []);

  async function onSubmit(data) {
    try {
      await complaintsApi.createComplaint({
        title: data.title,
        description: data.description,
        categoryId: Number(data.categoryId)
      });
      navigate('/complaints');
    } catch (e) {
      setError('root', { message: 'Failed to submit complaint' });
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h3>Submit Complaint</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register('title', { required: true })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`} {...register('categoryId', { required: true })}>
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea rows={4} className={`form-control ${errors.description ? 'is-invalid' : ''}`} {...register('description', { required: true })} />
        </div>
        {errors.root && <div className="alert alert-danger py-2">{errors.root.message}</div>}
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FoodHomePage.module.css';
import PageHeader from '../components/PageHeader';

export default function FoodHomePage() {
  const outlets = [
    {
      key: 'barista',
      name: 'Barista',
      img: 'https://images.squarespace-cdn.com/content/v1/5a74702ce45a7cd601df944b/41f0b38a-52c5-439f-ba22-8504d3ba209f/Barista+logo-+white.png',
      tagline: 'Coffee that fuels your day.',
      to: '/food/barista',
    },
    {
      key: 'subway',
      name: 'Subway',
      img: 'https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Subway_Logo_Design_History_Evolution_8_1024x1024.jpg?v=1693499821',
      tagline: 'Eat Fresh and savor every bite.',
      to: '/food/subway',
    },
    {
      key: 'grabngo',
      name: 'Grab N Go',
      img: 'https://logodix.com/logo/395941.png',
      tagline: 'Quick, healthy, and tasty.',
      to: '/food/grabngo',
    },
    {
      key: 'indian',
      name: 'Indian Chaat Bhandar',
      img: 'https://mir-s3-cdn-cf.behance.net/projects/404/7c858b71148485.Y3JvcCwyMzcwLDE4NTQsNDA0LDA.png',
      tagline: 'Spice up your life.',
      to: '/food/indian',
    },
  ];

  return (
    <div className={styles.root}>
      <PageHeader title="Food Outlets" action={<Link to="/food/history" className="btn btn-outline-secondary btn-sm">Order History</Link>} />

      <div className={`section ${styles.grid}`}>
        {outlets.map((o) => (
          <Link key={o.key} to={o.to} className="text-decoration-none text-dark">
            <div className={styles.card}>
              <img src={o.img} alt={o.name} className={styles.image} />
              <div className={styles.body}>
                <h5 className={styles.name}>{o.name}</h5>
                <div className={styles.tag}>{o.tagline}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

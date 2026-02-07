import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function DashboardPage() {
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef(null);
  const slides = [
    '/event1.jpeg',
    '/event2.jpeg',
    '/event3.jpeg',
    '/event4.jpeg',
    '/event5.jpeg',
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  return (
    <div>
      <PageHeader title="Dashboard" />

      {/* Outlets carousel-like cards */}
      <section className="section">
        <div className="row flex-nowrap overflow-auto g-3 px-3">
          <div className="col" style={{minWidth: 260}}>
            <Link to="/food" className="text-decoration-none text-dark">
              <div className="card" style={{borderRadius: 20}}>
                <img src="https://images.squarespace-cdn.com/content/v1/5a74702ce45a7cd601df944b/41f0b38a-52c5-439f-ba22-8504d3ba209f/Barista+logo-+white.png" className="card-img-top" alt="Barista" style={{height: 200, objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Barista</h5>
                  <p className="card-text"><i>"Without my coffee in a day, I'm just like a dried-up piece of roast goat."</i></p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col" style={{minWidth: 260}}>
            <Link to="/food" className="text-decoration-none text-dark">
              <div className="card" style={{borderRadius: 20}}>
                <img src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Subway_Logo_Design_History_Evolution_8_1024x1024.jpg?v=1693499821" className="card-img-top" alt="Subway" style={{height: 200, objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Subway</h5>
                  <p className="card-text"><i>Eat Fresh and savor every bite.</i></p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col" style={{minWidth: 260}}>
            <Link to="/food" className="text-decoration-none text-dark">
              <div className="card" style={{borderRadius: 20}}>
                <img src="https://logodix.com/logo/395941.png" className="card-img-top" alt="Grab N Go" style={{height: 200, objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Grab N Go</h5>
                  <p className="card-text"><i>Cheers to good health and nutrients!</i></p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col" style={{minWidth: 260}}>
            <Link to="/food" className="text-decoration-none text-dark">
              <div className="card" style={{borderRadius: 20}}>
                <img src="https://mir-s3-cdn-cf.behance.net/projects/404/7c858b71148485.Y3JvcCwyMzcwLDE4NTQsNDA0LDA.png" className="card-img-top" alt="Indian" style={{height: 200, objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Indian Chaat Bhandar</h5>
                  <p className="card-text"><i>Spicing up your life.</i></p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome strip */}
      <section className="section d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <i className="fa fa-user me-2" />
          <span className="fw-bold me-2">Welcome</span>
          <span>Student</span>
        </div>
        <div className="px-3 py-1 rounded" style={{background:'#c12525', color:'#fff', fontWeight:'bold'}}>₹1000 Balance</div>
      </section>

      {/* Slideshow */}
      <section className="section">
        <div className="position-relative" style={{border:'4px solid #363535', borderRadius: 4}}>
          <img src={slides[slide]} alt="event" style={{width:'100%', height:'auto'}} />
          <div className="text-center my-2">
            {slides.map((_, idx) => (
              <span key={idx} className="mx-1" style={{display:'inline-block', width:10, height:10, borderRadius:'50%', backgroundColor: idx===slide ? '#faf8f8' : '#ea1010'}} />
            ))}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="section">
        <video width="100%" height="auto" controls>
          <source src="/videoplayback.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Mess image */}
      <section className="section">
        <h4 className="mb-3"><i className="fa-solid fa-utensils" /> Mess Menu</h4>
        <div className="text-center">
          <img src="/WhatsApp Image 2024-08-29 at 21.00.06.jpeg" alt="Mess Menu" className="img-fluid" />
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="text-center text-muted py-3">2024 © Chitkara University</footer>
    </div>
  );
}

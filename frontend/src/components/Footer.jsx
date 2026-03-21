import React from 'react';
import { FaPhoneAlt, FaUsers, FaHeartbeat, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-4">
          
          {/* Emergency Support */}
          <div className="col-12 col-md-4">
            <h5 className={`${styles.title} ${styles.emergencyTitle}`}>
              <FaHeartbeat /> Immediate Help
            </h5>
            <p className={styles.description}>
              If you or someone you know is in immediate danger, please contact emergency services or use these hotlines:
            </p>
            <div className={styles.buttonGrid}>
              <a href="tel:988" className={styles.emergencyBtn}>
                <FaPhoneAlt className="me-2" /> 988 Crisis Lifeline
              </a>
              <a href="https://www.crisistextline.org/" target="_blank" rel="noreferrer" className={styles.textBtn}>
                <FaEnvelope className="me-2" /> Text HOME to 741741
              </a>
            </div>
          </div>

          {/* Community Support */}
          <div className="col-12 col-md-4">
            <h5 className={`${styles.title} ${styles.communityTitle}`}>
              <FaUsers /> Community Support
            </h5>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><a href="/groups" className={styles.link}>Peer Support Groups</a></li>
              <li className={styles.linkItem}><a href="/forums" className={styles.link}>Discussion Forums</a></li>
              <li className={styles.linkItem}><a href="/mentors" className={styles.link}>Wellness Mentors</a></li>
            </ul>
          </div>

          {/* Professional Resources */}
          <div className="col-12 col-md-4">
            <h5 className={`${styles.title} ${styles.professionalTitle}`}>
              Professional Help
            </h5>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="https://www.psychologytoday.com" target="_blank" rel="noreferrer" className={styles.link}>
                  Find a Therapist <FaExternalLinkAlt size={10} />
                </a>
              </li>
              <li className={styles.linkItem}><a href="/telehealth" className={styles.link}>Telehealth Consult</a></li>
              <li className={styles.linkItem}><a href="/resources" className={styles.link}>Mental Health Toolkit</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomBar}>
          <p className="mb-0">© 2026 Haven Wellness. You are not alone.</p>
          <div className="d-flex gap-3">
            <a href="/privacy" className={styles.link}>Privacy Policy</a>
            <a href="/terms" className={styles.link}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
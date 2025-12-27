import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice'; 
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import showWarningAlert from '../components/styleComponnents/myAlert';


const INACTIVITY_TIME = 5 * 60 * 1000; // 5 דקות

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = useCallback(() => {
    dispatch(logout());

    navigate('/login');

    showWarningAlert(
      'Session Expired',
      'The system detected prolonged inactivity, so you have been automatically logged out for your account security.'
    );
  }, [dispatch, navigate]);

  useEffect(() => {
    // אם המשתמש לא מחובר, אין צורך להפעיל טיימרים
    if (!isAuthenticated) return;

    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    // רשימת האירועים שנחשבים לפעילות
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    // הוספת האזנה לכל אירוע
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // הפעלה ראשונית של הטיימר
    resetTimer();

    // פונקציית ניקוי (Cleanup) בעת יציאה מהקומפוננטה או שינוי במצב התחברות
    return () => {
      if (timer) clearTimeout(timer);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, handleLogout]);
};
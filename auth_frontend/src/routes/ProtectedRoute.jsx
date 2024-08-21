import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import useIdleTimeout from "../hooks/idleTimer"
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TIMOUT_DURATION = 10000 * 10 // 10 seconds for testing

export const ProtectedRoute = ({ children }) => {
  const {token, logoutAction} = useAuth();
  const [openModal, setOpenModal] = useState(false)

  const handleIdle = () => {
    setOpenModal(true)
  }

  const {idleTimer} = useIdleTimeout({onIdle: handleIdle, idleTime: 5})
  const stay = () => {
    setOpenModal(false)
    idleTimer.reset()
  }

  const handleLogout = () => {
    logoutAction()
    setOpenModal(false)
  }

  if (!token) {
    // user is not authenticated
    return <Navigate to="/unauthorized" />;
  }
  return <>
          <Outlet />
          <Button variant="primary" onClick={()=>setOpenModal(true)}>Open Modal</Button>
          <Modal 
            open={openModal}
            onClose={stay}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Your session is about to Expire
              </Typography>
              <Typography id="modal-modal-description" sx={{mt:2}}>
                Your session is about to expire. You'll be automatically signed out.
              </Typography>
              <Typography id="modal-modal-description" sx={{mt:2}}>
                Do you want to stay signed in?
              </Typography>
              <Button variant="secondary" onClick={handleLogout}>Sign out now</Button>
              <Button variant="primary" onClick={stay}>Stay signed in</Button>
            </Box>
          </Modal>
          </>;
};

export default ProtectedRoute
// // components/DashboardContainer.jsx

// import React from 'react';
// import { Outlet, Navigate } from 'react-router';
// import Loading from '../../components/ui/Loading';
// import UseAuth from '../../hooks/UseAuth';


// const DashboardContainer = () => {
//     const { loading, role } = UseAuth();

//     if (loading) {
//         return <Loading />;
//     }
    
//     if (window.location.pathname === '/dashboard') {
//         if (role === 'STUDENT') return <Navigate to="/dashboard/student" replace />;
//         if (role === 'TUTOR') return <Navigate to="/dashboard/tutor" replace />;
//         if (role === 'ADMIN') return <Navigate to="/dashboard/admin" replace />;
        
//         return <Navigate to="/" replace />;
//     }


//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//             {/* header */}
//             <Outlet />
//             {/* footer */}
//         </div>
//     );
// };

// export default DashboardContainer;
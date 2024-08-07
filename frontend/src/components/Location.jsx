// import React from 'react';
// import { geolocated } from 'react-geolocated';

// const LocationComponent = ({ isGeolocationAvailable, isGeolocationEnabled, coords, onLocationChange }) => {
//   // Call the callback function to update the parent's state
//   if (isGeolocationAvailable && isGeolocationEnabled) {
//     onLocationChange(coords.latitude, coords.longitude);
//   }

//   return (
//     <div>
//       {isGeolocationAvailable ? (
//         <div>
//           {isGeolocationEnabled ? (
//             <div>
//               Latitude: {coords.latitude}<br />
//               Longitude: {coords.longitude}
//             </div>
//           ) : (
//             <div>Geolocation is not enabled</div>
//           )}
//         </div>
//       ) : (
//         <div>Your browser does not support Geolocation</div>
//       )}
//     </div>
//   );
// };

// export default LocationComponent;
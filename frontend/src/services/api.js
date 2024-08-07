// // api.js
// const apiUrl = 'http://localhost:3000/';

//  const fetchData = async (endpoint, method, data) => {
//   try {
//     const response = await fetch(`${apiUrl}/${endpoint}`, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: data ? JSON.stringify(data) : undefined,
//     });

//     const responseData = await response.json();
//     console.log(responseData);
//     return responseData;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };



// export default sendData;


// // const sendData = async () => {
// //     const dataToSend = { key1: 'value1', key2: 'value2' };
  
// //     // Make the POST request
// //     try {
// //       const response = await fetch('http://your-server-url/api/endpoint', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(dataToSend),
// //       });
  
// //       const responseData = await response.json();
  
// //       // Handle the response data
// //       console.log(responseData);
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };
  
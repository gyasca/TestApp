import React from 'react'

function ViewLeave() {
    useEffect(() => {
        // Fetch employee data based on ID when the component mounts
        fetchLeaveRequests();
      }, []);
    
      const fetchLeaveRequests = () => {
        http.get(`/api/v2/tables/mfonb8z9mmrcvzr/records`).then((res) => {
          console.log("Fetched employee data:", res.data.data);
          setEmployeeData(res.data.data);
          //   setLoading(false); // Set loading to false after data is fetched
        });
      };
  return (
    <div>ViewLeave</div>
  )
}

export default ViewLeave
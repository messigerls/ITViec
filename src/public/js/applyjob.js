console.log('alo')
const deleteApplyJob = async(id) => {
    const fetchDelete = await fetch('https://localhost:3000/delete-apply-job/' + id, {
        method: 'DELETE',
    })
    .then(res => res.json()) // or res.json()
    .then(res => console.log(res))
    
}
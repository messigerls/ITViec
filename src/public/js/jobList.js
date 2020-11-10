

// new Promise((resolve, reject) => {
//     // const pathName = window.location.pathname;
//     // $.get(`http://localhost:3000/api${pathName}`, (data, result) => {
//     //     resolve(data)
//     // })
   
// }).then(data => {
//     const jobList = data.jobCompany;
//     console.log(jobList);
//     const countJob = document.getElementById('countJob');
//    // countJob.innerHTML = jobList.length;
//     const mainJob = document.querySelector('.main__job');
//     let jobItemString = '';
//     jobList.forEach(job => {
        
//         let techString = '';
//         job.technology_arr.forEach(tech => {
//             techString += `<a href="/job-list/all/${tech.technology_name}" class="job__tech__item">${tech.technology_name}</a>`
//         })
//         console.log(techString)
//         jobItemString += `<div class="main__job__item">
//                             <div class="job__item__left">
//                                 <a href="/company/${job.company_id}">
//                                     <img src=${job.company_avatar} alt="avatar company" class="main__item__left__img">
//                                 </a>
//                             </div>
//                             <div class="job__item__center">
//                                 <a href="/job/${job.job_id}">
//                                     <h2 class="job__item__title">${job.number_of_job} ${job.job_title}</h2>
//                                 </a>
//                                 <p class="job__item__salary"><i class="fas fa-dollar-sign"></i> ${job.min_salary == 0 ? '?' : job.min_salary} - ${job.max_salary == 0 ? '?' : job.max_salary}</p>
                                
//                                 <p class="job__description">${job.job_description}</p>
//                                 <div class="job__tech__list">
//                                     ${techString}
//                                 </div>
                                
//                             </div>
//                             <div class="job__item__right">
//                                 <div class="job__item__right__top">
//                                     <span>Hà Nội</span>
                                    
//                                 </div>
//                                 <div class="job__item__right__bot">
//                                     <span>3 ngày trước</span>
//                                 </div>
//                             </div>
//                         </div>`
//     })
//     //mainJob.innerHTML = jobItemString;
// })

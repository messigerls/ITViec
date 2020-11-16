
let page = 1, limit = 10;
let totalRow = null;
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const countJobSpan = document.querySelector('#countJob');
const mainJob = document.querySelector('.main__job');
const pageActive = document.querySelector('#pageActive');
const totalPage = document.querySelector('#totalPage');

const previousPage = () => {
    page--;
    if(page <= 1){
        previous.classList.add('disabled');
    }
    if(totalRow > limit * page){
        next.classList.remove('disabled')
    }
    renderJobList(limit, page);
}
const nextPage = () => {
    page++;
    if(totalRow <= limit * page){
        next.classList.add('disabled');
    }
    if(page > 1){
        previous.classList.remove('disabled');
    }
    renderJobList(limit, page);
}
const renderJobList = (limit, page) => {
    mainJob.innerHTML = `<div id="loader"></div>`;
    const pathname = window.location.pathname;
    const url = `http://localhost:3000/api${pathname}?_limit=${limit}&_page=${page}`;
    console.log(url);
    $.get(url, (data, result) => {
        console.log(data)
        const {techData, jobData, countJob} = data;
        totalRow = countJob;
        if(totalRow <= limit * page){
            next.classList.add('disabled');
        }
        countJobSpan.innerHTML = countJob;
        pageActive.innerHTML = page;
        totalPage.innerHTML = Math.ceil(totalRow/limit);
        let content = '';
        jobData.forEach(job => {
            let techString = '';
            techData.filter(techJob => techJob.job_id === job.job_id)[0].technology_arr.map(tech => { 
                techString += `<a href="/job-list/all/${tech.technology_name}" class="job__tech__item">${tech.technology_name}</a>`
            })
            
            content += `<div class="main__job__item">
                            <div class="job__item__left">
                                <a href="/company/${job.company_id}">
                                    <img src=${job.company_avatar} alt="avatar company" class="main__item__left__img">
                                </a>
                            </div>
                            <div class="job__item__center">
                                <a href="/job/${job.job_id}">
                                    <h3 class="job__item__title">${job.number_of_job} ${job.job_title}</h3>
                                </a>
                                <p class="job__item__salary"><i class="fas fa-dollar-sign"></i> ${(job.min_salary || '?') + ' - ' + (job.max_salary || '?')}</p>
                                
                                <div class="main__job__description">
                                    <p class="job__description">${job.job_description}</p>
                                </div>
                                <div class="job__tech__list">
                                    ${techString} 
                                </div>
                            </div>
                            <div class="job__item__right">
                                <div class="job__item__right__top">
                                    <span>${job.province_name}</span>
                                </div>
                                <div class="job__item__right__bot">
                                    <span>${job.distanceTime}</span>
                                </div>
                            </div>
                        </div>`
        })
        mainJob.innerHTML = content;
    })
}
renderJobList(limit, page);


// <% jobData.reverse().forEach(job => { %> 
//     <div class="main__job__item">
//         <div class="job__item__left">
//             <a href="/company/<%= job.company_id %>">
//                 <img src=<%= job.company_avatar %>  alt="avatar company" class="main__item__left__img">
//             </a>
//         </div>
//         <div class="job__item__center">
//             <a href="/job/<%= job.job_id %>">
//                 <h3 class="job__item__title"><%= job.number_of_job %> <%= job.job_title %></h3>
//             </a>
//             <p class="job__item__salary"><i class="fas fa-dollar-sign"></i> <%= (job.min_salary || '?') + ' - ' + (job.max_salary || '?')%> </p>
            
//             <div class="main__job__description">
//                 <p class="job__description"><%= job.job_description %></p>
//             </div>
//             <div class="job__tech__list">
//                 <% techData.filter(techJob => techJob.job_id === job.job_id)[0].technology_arr.map(tech => { %> 
//                     <a href="/job-list/all/<%= tech.technology_name %>" class="job__tech__item"><%= tech.technology_name %></a>
//                 <% }) %> 
//             </div>
//         </div>
//         <div class="job__item__right">
//             <div class="job__item__right__top">
//                 <span><%= job.province_name %></span>
//             </div>
//             <div class="job__item__right__bot">
//                 <span><%= job.distanceTime %> </span>
//             </div>
//         </div>
//     </div>
// <% }) %> 
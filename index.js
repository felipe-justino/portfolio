import { dataCol1, dataCol2, dataCol3 } from './data.js';
gsap.registerPlugin(ScrollTrigger);

const projectsSelector = {
    element: document.querySelector('.projects'),
    wrapper: document.querySelector('.projects_wrapper'),
    outro: document.querySelector('projects_outro'),
};

const isMobile = window.matchMedia('(max-wodth: 768px)').matches;


const createContents = () => {

    const datasets = [dataCol1, dataCol2, dataCol3];

    datasets.forEach((data) => {
        const projectCol = document.createElement('div');
        projectCol.classList.add('projects_col');
        projectsSelector.wrapper.appendChild(projectCol);

        data.forEach((item) => {
            const projectsItem = document.createElement('div');
            projectsItem.classList.add('projects_col_item');
            projectsItem.style.backgroundColor = item.backgroundColor;

            projectsItem.innerHTML = `
                <div class="projects_col_item_title">
                    <h2>${item.id}</h2>
                </div>
                <div class="projects_col_item_img">
                    <img src="${item.img} alt="" />
                </div>
            `;
                
            projectCol.appendChild(projectsItem);
                
        });
        
    });

    if(!isMobile) calcFilledSpace ();
};

const initLenis = () => {
    const lenis = new Lenis({
        lerp: 0.064,
        smoothWheel: true,
    })
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
};

const animateHero = ()=> {
    const heroTitles = document.querySelectorAll('.hero_title');

    gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    })
        .to(heroTitles[0], { yPercent: 120 })
        .to(heroTitles[1], { yPercent: 60 }, 0);
};

const calcFilledSpace = ()=> {
    const projectCols = document.querySelectorAll('.projects_col');
    const projectColSecond = projectCols[1].getBoundingClientRect().height;
    const projectColThird = projectCols[2].getBoundingClientRect().height;

    const difference = projectColThird - projectColSecond; 

    if(!isMobile) animateMedia(projectCols, difference)
};

const animateMedia = (projectCols, difference) => {
gsap.set(projectCols[1],{ y: 0});

gsap.timeline({
    scrollTrigger: {
        trigger: projectsSelector.element,
        end: ()=> `${projectsSelector.element.offsetHeight}px bottom`,
        scrub: true,
    },
}).to(projectCols[1], {
    duration: 2,
    y: difference,
    ease: 'none',

});};

const animateOutro = () => {
    gsap.set('.outro_wrapper', { yPercent: -150 });

    gsap.timeline({
        scrollTrigger: {
            trigger:'.outro',
            start: '-50% bottom',
            end: ()=> 'bottom bottom',
            scrub: true,
        },
    }).to('.outro_wrapper', { yPercent: 0});
};



window.addEventListener('DOMContentLoaded', () => {
    createContents();


    if (!isMobile) initLenis();
    if (!isMobile) animateHero();
    if (!isMobile) animateOutro();

});

if (!isMobile) window.addEventLisneter('resize', calcFilledSpace);

    

        
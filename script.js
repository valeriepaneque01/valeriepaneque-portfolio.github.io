const body = document.body

// = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

// const addThemeClass = (bodyClass, btnClass) => {
//  body.classList.add(bodyClass)
//  btnTheme.classList.add(btnClass)
// }

// const getBodyTheme = localStorage.getItem('portfolio-theme')
// const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

// addThemeClass(getBodyTheme, getBtnTheme)

// const isDark = () => body.classList.contains('dark')

// const setTheme = (bodyClass, btnClass) => {

//	body.classList.remove(localStorage.getItem('portfolio-theme'))
//	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

//  addThemeClass(bodyClass, btnClass)

//	localStorage.setItem('portfolio-theme', bodyClass)
//	localStorage.setItem('portfolio-btn-theme', btnClass)
// }

// const toggleTheme = () =>
//	isDark() ? setTheme('light', 'fa-solid fa-moon') : setTheme('dark', 'fa-solid fa-sun')


// btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-solid fa-bars')) {
		btnHamburger.classList.remove('fa-solid fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-solid fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

// Add this to your script.js file

// Animate progress bars when they come into view
const animateProgressBars = () => {
	const progressBars = document.querySelectorAll('.skill-progress-fill');
	
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  const progressBar = entry.target;
		  const targetWidth = progressBar.style.width;
		  
		  // Reset and animate
		  progressBar.style.width = '0%';
		  setTimeout(() => {
			progressBar.style.width = targetWidth;
		  }, 100);
		  
		  // Stop observing this element
		  observer.unobserve(progressBar);
		}
	  });
	}, {
	  threshold: 0.5,
	  rootMargin: '0px 0px -100px 0px'
	});
  
	progressBars.forEach(bar => {
	  observer.observe(bar);
	});
  };
  
  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
	animateProgressBars();
  });

  // Advanced Scroll Animations

// Scroll Progress Indicator
const createScrollProgress = () => {
	const progressBar = document.createElement('div');
	progressBar.className = 'scroll-progress';
	document.body.appendChild(progressBar);
  
	window.addEventListener('scroll', () => {
	  const scrollTop = window.pageYOffset;
	  const docHeight = document.body.scrollHeight - window.innerHeight;
	  const scrollPercent = (scrollTop / docHeight) * 100;
	  progressBar.style.width = scrollPercent + '%';
	});
  };
  
  // Intersection Observer for animations
  const createScrollObserver = () => {
	const observerOptions = {
	  threshold: 0.1,
	  rootMargin: '0px 0px -50px 0px'
	};
  
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('animate');
		  
		  // Special handling for staggered animations
		  if (entry.target.classList.contains('skills__group')) {
			animateSkillItems(entry.target);
		  }
		  
		  if (entry.target.classList.contains('projects__grid')) {
			animateProjectItems(entry.target);
		  }
		}
	  });
	}, observerOptions);
  
	// Observe all animation elements
	const animationElements = document.querySelectorAll(`
	  .fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .scale-in,
	  .section__title, .skills__group, .projects__grid, .contact
	`);
  
	animationElements.forEach(el => observer.observe(el));
  };
  
  // Animate skill items with stagger
  const animateSkillItems = (skillsGroup) => {
	const skillItems = skillsGroup.querySelectorAll('.skill-item, .skill-tag');
	
	skillItems.forEach((item, index) => {
	  setTimeout(() => {
		item.classList.add('animate');
	  }, index * 100);
	});
  };
  
  // Animate project items with stagger
  const animateProjectItems = (projectsGrid) => {
	const projects = projectsGrid.querySelectorAll('.project');
	
	projects.forEach((project, index) => {
	  setTimeout(() => {
		project.classList.add('animate');
	  }, index * 150);
	});
  };
  
  // Active navigation highlighting
  const updateActiveNavigation = () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav__list-item a[href^="#"]');
  
	window.addEventListener('scroll', () => {
	  const scrollPos = window.pageYOffset + 100;
  
	  sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute('id');
  
		if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
		  navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${sectionId}`) {
			  link.classList.add('active');
			}
		  });
		}
	  });
	});
  };
  
  // Smooth scroll enhancement
  const enhanceSmoothScroll = () => {
	const navLinks = document.querySelectorAll('a[href^="#"]');
	
	navLinks.forEach(link => {
	  link.addEventListener('click', (e) => {
		e.preventDefault();
		
		const targetId = link.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		
		if (targetElement) {
		  const offsetTop = targetElement.offsetTop - 80; // Account for header
		  
		  window.scrollTo({
			top: offsetTop,
			behavior: 'smooth'
		  });
		}
	  });
	});
  };
  
  // Parallax effect for hero background
  const addParallaxEffect = () => {
	const heroBackground = document.querySelector('.hero-background');
	
	if (heroBackground) {
	  window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		const parallax = scrolled * 0.5;
		heroBackground.style.transform = `translateY(${parallax}px)`;
	  });
	}
  };
  
  // Initialize all animations
  const initScrollAnimations = () => {
	// Add initial animation classes to elements
	const elementsToAnimate = [
	  { selector: '.section__title', class: 'fade-in' },
	  { selector: '.about__desc', class: 'fade-in-up' },
	  { selector: '.about__contact', class: 'fade-in-up' },
	  { selector: '.projects__subtitle', class: 'fade-in-left' },
	  { selector: '.contact', class: 'scale-in' }
	];
  
	elementsToAnimate.forEach(({ selector, class: animationClass }) => {
	  const elements = document.querySelectorAll(selector);
	  elements.forEach(el => el.classList.add(animationClass));
	});
  
	// Initialize all scroll features
	createScrollProgress();
	createScrollObserver();
	updateActiveNavigation();
	enhanceSmoothScroll();
	addParallaxEffect();
  };
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
  
  // Refresh animations on window resize
  window.addEventListener('resize', () => {
	// Recalculate positions for scroll-based animations
	setTimeout(createScrollObserver, 100);
  });

  // Enhanced Navigation JavaScript

// Header scroll effects
const initHeaderEffects = () => {
	const header = document.querySelector('.header');
	let lastScrollY = window.scrollY;
	let ticking = false;
  
	const updateHeader = () => {
	  const scrollY = window.scrollY;
	  
	  // Add scrolled class for backdrop blur effect
	  if (scrollY > 50) {
		header.classList.add('scrolled');
	  } else {
		header.classList.remove('scrolled');
	  }
  
	  // Hide/show header based on scroll direction
	  if (scrollY > lastScrollY && scrollY > 200) {
		header.classList.add('hidden');
	  } else {
		header.classList.remove('hidden');
	  }
  
	  lastScrollY = scrollY;
	  ticking = false;
	};
  
	const requestTick = () => {
	  if (!ticking) {
		requestAnimationFrame(updateHeader);
		ticking = true;
	  }
	};
  
	window.addEventListener('scroll', requestTick);
  };
  
  // Enhanced mobile menu toggle
  const initMobileMenu = () => {
	const hamburger = document.querySelector('.nav__hamburger');
	const navList = document.querySelector('.nav__list');
	
	if (hamburger && navList) {
	  hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		navList.classList.toggle('display-nav-list');
		
		// Prevent body scroll when menu is open
		if (navList.classList.contains('display-nav-list')) {
		  document.body.style.overflow = 'hidden';
		} else {
		  document.body.style.overflow = '';
		}
	  });
  
	  // Close menu when clicking nav links
	  const navLinks = document.querySelectorAll('.nav__list-item a');
	  navLinks.forEach(link => {
		link.addEventListener('click', () => {
		  hamburger.classList.remove('active');
		  navList.classList.remove('display-nav-list');
		  document.body.style.overflow = '';
		});
	  });
  
	  // Close menu when clicking outside
	  document.addEventListener('click', (e) => {
		if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
		  hamburger.classList.remove('active');
		  navList.classList.remove('display-nav-list');
		  document.body.style.overflow = '';
		}
	  });
	}
  };
  
  // Section indicators (dots navigation)
  const createSectionIndicators = () => {
	const sections = document.querySelectorAll('section[id]');
	if (sections.length === 0) return;
  
	const indicatorsContainer = document.createElement('div');
	indicatorsContainer.className = 'section-indicators';
  
	sections.forEach(section => {
	  const indicator = document.createElement('div');
	  indicator.className = 'section-indicator';
	  indicator.setAttribute('data-tooltip', section.id.charAt(0).toUpperCase() + section.id.slice(1));
	  indicator.addEventListener('click', () => {
		section.scrollIntoView({ behavior: 'smooth', block: 'start' });
	  });
	  indicatorsContainer.appendChild(indicator);
	});
  
	document.body.appendChild(indicatorsContainer);
  
	// Update active indicator on scroll
	const updateActiveIndicator = () => {
	  const indicators = document.querySelectorAll('.section-indicator');
	  const scrollPos = window.scrollY + 150;
  
	  sections.forEach((section, index) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
  
		if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
		  indicators.forEach(ind => ind.classList.remove('active'));
		  indicators[index]?.classList.add('active');
		}
	  });
	};
  
	window.addEventListener('scroll', updateActiveIndicator);
	updateActiveIndicator(); // Initial call
  };
  
  // Enhanced active navigation with smooth transitions
  const initActiveNavigation = () => {
	const navLinks = document.querySelectorAll('.nav__list-item a[href^="#"]');
	const sections = document.querySelectorAll('section[id]');
  
	const updateActiveNav = () => {
	  const scrollPos = window.scrollY + 120;
  
	  sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute('id');
  
		if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
		  navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${sectionId}`) {
			  link.classList.add('active');
			}
		  });
		}
	  });
	};
  
	window.addEventListener('scroll', updateActiveNav);
	updateActiveNav(); // Initial call
  };
  
  // Smooth scroll with offset for fixed header
  const initSmoothScroll = () => {
	const navLinks = document.querySelectorAll('a[href^="#"]');
	
	navLinks.forEach(link => {
	  link.addEventListener('click', (e) => {
		e.preventDefault();
		
		const targetId = link.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		
		if (targetElement) {
		  const headerHeight = document.querySelector('.header').offsetHeight;
		  const offsetTop = targetElement.offsetTop - headerHeight - 20;
		  
		  window.scrollTo({
			top: offsetTop,
			behavior: 'smooth'
		  });
		}
	  });
	});
  };
  
  // Keyboard navigation support
  const initKeyboardNavigation = () => {
	const navLinks = document.querySelectorAll('.nav__list-item a');
	
	navLinks.forEach((link, index) => {
	  link.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
		  e.preventDefault();
		  const nextIndex = (index + 1) % navLinks.length;
		  navLinks[nextIndex].focus();
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
		  e.preventDefault();
		  const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
		  navLinks[prevIndex].focus();
		}
	  });
	});
  
	// ESC to close mobile menu
	document.addEventListener('keydown', (e) => {
	  if (e.key === 'Escape') {
		const hamburger = document.querySelector('.nav__hamburger');
		const navList = document.querySelector('.nav__list');
		
		if (navList?.classList.contains('display-nav-list')) {
		  hamburger?.classList.remove('active');
		  navList.classList.remove('display-nav-list');
		  document.body.style.overflow = '';
		}
	  }
	});
  };
  
  // Initialize all navigation features
  const initEnhancedNavigation = () => {
	initHeaderEffects();
	initMobileMenu();
	createSectionIndicators();
	initActiveNavigation();
	initSmoothScroll();
	initKeyboardNavigation();
  };
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initEnhancedNavigation);


  // Preloader functionality
window.addEventListener('load', () => {
	const preloader = document.getElementById('preloader');
	
	// Hide preloader after a minimum time to show the animation
	setTimeout(() => {
	  preloader.classList.add('hidden');
	  
	  // Remove preloader from DOM after transition
	  setTimeout(() => {
		preloader.remove();
	  }, 500);
	}, 800); // Show for at least 800ms
  });
  
  // Fallback: Hide preloader after 3 seconds regardless
  setTimeout(() => {
	const preloader = document.getElementById('preloader');
	if (preloader) {
	  preloader.classList.add('hidden');
	  setTimeout(() => preloader.remove(), 500);
	}
  }, 3000);
  
document.addEventListener('scroll', scrollUp)
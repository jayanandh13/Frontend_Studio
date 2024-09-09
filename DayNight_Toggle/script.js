const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        const body = document.body;

      
        const savedMode = localStorage.getItem('mode');

        if (savedMode === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        
        sunIcon.addEventListener('click', () => {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('mode', 'light');  
        });

        
        moonIcon.addEventListener('click', () => {
            body.classList.add('dark-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('mode', 'dark');  
        });
const showMessage = (message, duration = 3000, isError = false) => {
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = message;
            messageBox.classList.remove('bg-blue-500', 'bg-red-500');
            messageBox.classList.add(isError ? 'bg-red-500' : 'bg-blue-500');
            messageBox.classList.add('show');
            setTimeout(() => {
                messageBox.classList.remove('show');
            }, duration);
        };

        const subjects = [
            {
                name: "Mathematics",
                lectures: [
                    {
                        id: `lecture-1`,
                        name: `Lecture 1: Calculus Fundamentals`,
                        podbean: `<iframe title="CC 10: Security issues 1" allowtransparency="true" height="150" width="100%" style="border: none; min-width: min(100%, 430px);height:150px;" scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=pbdx9-1936757-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=3267a3" loading="lazy"></iframe>`,
                        quiz: `<iframe src="https://abuu-abdallah.github.io/Hiwarat/Lexipedia-Cert-Verification/quiz-test.html" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`
                    },
                    ...Array.from({ length: 11 }, (_, i) => ({
                        id: `lecture-${i + 2}`,
                        name: `Lecture ${i + 2}: Calculus Fundamentals`,
                        podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                        quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                    }))
                ]
            },
            {
                name: "History",
                lectures: Array.from({ length: 12 }, (_, i) => ({
                    id: `lecture-${i + 1}`,
                    name: `Lecture ${i + 1}: The Roman Empire`,
                    podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                    quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                }))
            },
            {
                name: "Physics",
                lectures: Array.from({ length: 12 }, (_, i) => ({
                    id: `lecture-${i + 1}`,
                    name: `Lecture ${i + 1}: Quantum Mechanics`,
                    podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                    quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                }))
            },
            {
                name: "Chemistry",
                lectures: Array.from({ length: 12 }, (_, i) => ({
                    id: `lecture-${i + 1}`,
                    name: `Lecture ${i + 1}: Organic Compounds`,
                    podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                    quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                }))
            },
            {
                name: "Biology",
                lectures: Array.from({ length: 12 }, (_, i) => ({
                    id: `lecture-${i + 1}`,
                    name: `Lecture ${i + 1}: Cellular Respiration`,
                    podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                    quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                }))
            },
            {
                name: "Computer Science",
                lectures: Array.from({ length: 12 }, (_, i) => ({
                    id: `lecture-${i + 1}`,
                    name: `Lecture ${i + 1}: Data Structures`,
                    podbean: "https://www.podbean.com/media/player/7u9h2-9g9k5?from=embed&skin=1&btn-skin=135&size=200&share=1&fonts=Inter&auto=0&download=1&rtl=0",
                    quiz: "https://www.qzzr.com/quiz/en/609a4d81-12c8-4a11-a8b2-38a3c898c6b7"
                }))
            }
        ];

        const renderLectureList = (subjectName) => {
            const subject = subjects.find(s => s.name === subjectName);
            if (!subject) return;

            document.getElementById('subject-title').textContent = subject.name;
            document.getElementById('intro-message').classList.add('hidden');
            document.getElementById('lecture-detail-container').classList.add('hidden');
            document.getElementById('lecture-list-container').classList.remove('hidden');

            const lectureListDiv = document.getElementById('lecture-list');
            lectureListDiv.innerHTML = '';
            
            subject.lectures.forEach(lecture => {
                const card = document.createElement('div');
                card.classList.add('bg-gray-900', 'p-4', 'rounded-lg', 'shadow', 'cursor-pointer', 'hover:shadow-md', 'transition-shadow', 'transition-colors', 'duration-300', 'border-2', 'border-custom-orange');
                card.innerHTML = `
                    <h3 class="font-semibold text-lg text-gray-200">${lecture.name}</h3>
                `;
                card.addEventListener('click', () => displayLecture(subjectName, lecture.id));
                lectureListDiv.appendChild(card);
            });
        };

        const displayLecture = (subjectName, lectureId) => {
            const subject = subjects.find(s => s.name === subjectName);
            const lecture = subject.lectures.find(l => l.id === lectureId);
            if (!lecture) return;

            document.getElementById('lecture-list-container').classList.add('hidden');
            document.getElementById('lecture-detail-container').classList.remove('hidden');

            document.getElementById('lecture-title').textContent = lecture.name;
            document.getElementById('lecture-podbean-container').innerHTML = lecture.podbean;
            document.getElementById('quiz-frame').innerHTML = lecture.quiz;
        };
        
        const handleLogin = () => {
            const password = document.getElementById('passwordInput').value.trim();
            const users = {
                'lms-password': 'LMS User',
                'student123': 'Student',
                'teacher456': 'Teacher'
            };
            
            if (users[password]) {
                const username = users[password];
                showMessage(`Login successful!`);
                document.getElementById('userIdDisplay').textContent = `Welcome, ${username}!`;
                document.getElementById('login-container').classList.add('hidden');
                document.getElementById('lms-content').classList.remove('hidden');
            } else {
                showMessage('Invalid password. Please try again.', 3000, true);
            }
        };

        const initializeLMS = () => {
            // Render subject buttons
            const sidebar = document.getElementById('sidebar');
            subjects.forEach(subject => {
                const button = document.createElement('button');
                button.classList.add('text-left', 'py-3', 'px-4', 'rounded-lg', 'font-medium', 'text-gray-300', 'hover:bg-gray-700', 'transition-colors', 'duration-300');
                button.innerHTML = `<span>${subject.name}</span>`;
                button.addEventListener('click', () => {
                    document.querySelectorAll('#sidebar button').forEach(btn => btn.classList.remove('bg-gray-700', 'text-blue-400'));
                    button.classList.add('bg-gray-700', 'text-blue-400');
                    renderLectureList(subject.name);
                });
                sidebar.appendChild(button);
            });

            // Set up event listeners for the login button
            document.getElementById('loginBtn').addEventListener('click', handleLogin);
            document.getElementById('passwordInput').addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    handleLogin();
                }
            });
        };

        window.onload = initializeLMS;
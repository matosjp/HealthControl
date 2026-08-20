/**
 * HealthControl - Modern Health, Nutrition & Workout Tracker
 * Multi-profile management, interactive calendar/months selector,
 * dynamic workout routines, visual animated exercise library, rest timer,
 * and reactive metric cards.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // MONTHS & CALENDAR DEFINITIONS
    // -------------------------------------------------------------
    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // -------------------------------------------------------------
    // VISUAL EXERCISE LIBRARY WITH DETAILED ANIMATED SVGS
    // -------------------------------------------------------------
    const EXERCISES_DATABASE = [
        {
            id: 'ex_1',
            name: 'Supino Reto com Barra',
            category: 'peito',
            muscle: 'Peitoral Maior e Tríceps',
            equipment: 'Barra e Banco Reto',
            calories: 120,
            sets: '4 séries de 10-12 reps',
            desc: 'Deite-se no banco, segure a barra com pegada ligeiramente mais larga que os ombros, desça a barra até o meio do peito e empurre para cima mantendo as escápulas aduzidas.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <rect x="25" y="65" width="50" height="8" rx="4" fill="#6B7280" />
                    <circle cx="50" cy="50" r="8" fill="#FF7555" />
                    <line x1="50" y1="58" x2="50" y2="65" stroke="#333" stroke-width="4" />
                    <line x1="20" y1="36" x2="80" y2="36" stroke="#2DA4E8" stroke-width="5" stroke-linecap="round">
                        <animate attributeName="y1" values="36;46;36" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="36;46;36" dur="2s" repeatCount="indefinite" />
                    </line>
                    <circle cx="20" cy="36" r="6" fill="#191E28">
                        <animate attributeName="cy" values="36;46;36" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="80" cy="36" r="6" fill="#191E28">
                        <animate attributeName="cy" values="36;46;36" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>`
        },
        {
            id: 'ex_2',
            name: 'Flexão de Braço (Push-Up)',
            category: 'peito',
            muscle: 'Peito, Ombros e Core',
            equipment: 'Peso Corporal',
            calories: 90,
            sets: '3 séries até a falha',
            desc: 'Em posição de prancha, apoie as mãos na largura dos ombros. Desça o corpo em linha reta até o peito quase tocar o chão e retorne estendendo os braços.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <line x1="15" y1="75" x2="85" y2="75" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round" />
                    <g>
                        <line x1="25" y1="60" x2="70" y2="60" stroke="#FF5A73" stroke-width="6" stroke-linecap="round">
                            <animate attributeName="y1" values="60;70;60" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="60;72;60" dur="1.8s" repeatCount="indefinite" />
                        </line>
                        <circle cx="75" cy="56" r="7" fill="#FF7555">
                            <animate attributeName="cy" values="56;68;56" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                    </g>
                  </svg>`
        },
        {
            id: 'ex_3',
            name: 'Puxada Alta (Lat Pulldown)',
            category: 'costas',
            muscle: 'Dorsal e Bíceps',
            equipment: 'Polia Alta',
            calories: 110,
            sets: '4 séries de 12 reps',
            desc: 'Sente-se na máquina com as coxas fixas. Puxe a barra em direção à parte superior do peitoral, contraindo bem as costas e controlando o retorno.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <line x1="50" y1="10" x2="50" y2="25" stroke="#64748B" stroke-width="2" stroke-dasharray="2" />
                    <line x1="20" y1="25" x2="80" y2="25" stroke="#7048E8" stroke-width="5" stroke-linecap="round">
                        <animate attributeName="y1" values="25;48;25" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="25;48;25" dur="2.2s" repeatCount="indefinite" />
                    </line>
                    <circle cx="50" cy="58" r="8" fill="#FF7555" />
                    <rect x="42" y="66" width="16" height="24" rx="4" fill="#334155" />
                  </svg>`
        },
        {
            id: 'ex_4',
            name: 'Remada Curvada com Barra',
            category: 'costas',
            muscle: 'Dorsais, Trapézio e Lombar',
            equipment: 'Barra Olímpica',
            calories: 130,
            sets: '4 séries de 10 reps',
            desc: 'Incline o tronco à frente a 45 graus com a coluna ereta. Puxe a barra em direção ao umbigo contraindo as dorsais.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <line x1="40" y1="40" x2="65" y2="68" stroke="#1E293B" stroke-width="5" stroke-linecap="round" />
                    <circle cx="36" cy="34" r="7" fill="#FF7555" />
                    <line x1="30" y1="62" x2="60" y2="62" stroke="#2DA4E8" stroke-width="4" stroke-linecap="round">
                        <animate attributeName="y1" values="68;52;68" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="68;52;68" dur="2s" repeatCount="indefinite" />
                    </line>
                  </svg>`
        },
        {
            id: 'ex_5',
            name: 'Agachamento Livre',
            category: 'pernas',
            muscle: 'Quadríceps, Glúteos e Isquiotibiais',
            equipment: 'Barra Livre',
            calories: 150,
            sets: '4 séries de 10-12 reps',
            desc: 'Pés na largura dos ombros, desça flexionando os joelhos e jogando o quadril para trás como se fosse sentar em uma cadeira, mantendo o peito erguido.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <circle cx="50" cy="24" r="7" fill="#FF7555">
                        <animate attributeName="cy" values="24;42;24" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <line x1="30" y1="28" x2="70" y2="28" stroke="#FFA629" stroke-width="5" stroke-linecap="round">
                        <animate attributeName="y1" values="28;46;28" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="28;46;28" dur="2.2s" repeatCount="indefinite" />
                    </line>
                    <path d="M 50 32 L 50 55 L 38 82 M 50 55 L 62 82" stroke="#334155" stroke-width="4" fill="none" stroke-linecap="round">
                        <animate attributeName="d" values="M 50 32 L 50 55 L 38 82 M 50 55 L 62 82; M 50 50 L 50 68 L 32 82 M 50 68 L 68 82; M 50 32 L 50 55 L 38 82 M 50 55 L 62 82" dur="2.2s" repeatCount="indefinite" />
                    </path>
                  </svg>`
        },
        {
            id: 'ex_6',
            name: 'Leg Press 45°',
            category: 'pernas',
            muscle: 'Quadríceps e Glúteos',
            equipment: 'Máquina Leg Press',
            calories: 135,
            sets: '4 séries de 12 reps',
            desc: 'Apoie os pés na plataforma na largura do quadril. Destrave e desça controladamente até formar 90 graus nos joelhos, empurrando pelos calcanhares.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <rect x="15" y="70" width="30" height="15" rx="3" fill="#64748B" />
                    <line x1="45" y1="65" x2="80" y2="30" stroke="#CBD5E1" stroke-width="4" />
                    <rect x="68" y="24" width="20" height="8" rx="2" fill="#E64980" transform="rotate(-45 68 24)">
                        <animateTransform attributeName="transform" type="translate" values="0,0; -12,12; 0,0" dur="2s" repeatCount="indefinite" />
                    </rect>
                  </svg>`
        },
        {
            id: 'ex_7',
            name: 'Rosca Direta com Halteres',
            category: 'bracos',
            muscle: 'Bíceps Braquial',
            equipment: 'Halteres',
            calories: 85,
            sets: '3 séries de 12 reps',
            desc: 'Em pé com a coluna ereta, flexione os cotovelos trazendo os halteres em direção aos ombros, contraindo ao máximo no topo do movimento.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <circle cx="50" cy="28" r="7" fill="#FF7555" />
                    <line x1="50" y1="36" x2="50" y2="70" stroke="#334155" stroke-width="5" />
                    <circle cx="34" cy="58" r="5" fill="#12B886">
                        <animate attributeName="cy" values="64;42;64" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="66" cy="58" r="5" fill="#12B886">
                        <animate attributeName="cy" values="64;42;64" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  </svg>`
        },
        {
            id: 'ex_8',
            name: 'Tríceps na Polia (Corda)',
            category: 'bracos',
            muscle: 'Tríceps',
            equipment: 'Polia com Corda',
            calories: 80,
            sets: '3 séries de 12-15 reps',
            desc: 'Mantenha os cotovelos colados ao tronco. Estenda os braços para baixo abrindo a corda no final para pico de contração do tríceps.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <line x1="50" y1="10" x2="50" y2="35" stroke="#94A3B8" stroke-width="2" />
                    <path d="M 40 45 Q 50 35 60 45" stroke="#F06595" stroke-width="4" fill="none">
                        <animate attributeName="d" values="M 40 45 Q 50 35 60 45; M 34 72 Q 50 35 66 72; M 40 45 Q 50 35 60 45" dur="1.8s" repeatCount="indefinite" />
                    </path>
                    <circle cx="50" cy="30" r="6" fill="#FF7555" />
                  </svg>`
        },
        {
            id: 'ex_9',
            name: 'Desenvolvimento com Halteres',
            category: 'ombros',
            muscle: 'Deltóides (Ombros)',
            equipment: 'Halteres e Banco',
            calories: 95,
            sets: '4 séries de 10 reps',
            desc: 'Sentado com as costas apoiadas, empurre os halteres para cima até quase estender os braços, descendo até a linha das orelhas.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <circle cx="50" cy="50" r="7" fill="#FF7555" />
                    <rect x="42" y="58" width="16" height="26" rx="4" fill="#334155" />
                    <circle cx="28" cy="38" r="5" fill="#40C057">
                        <animate attributeName="cy" values="38;20;38" dur="1.9s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="72" cy="38" r="5" fill="#40C057">
                        <animate attributeName="cy" values="38;20;38" dur="1.9s" repeatCount="indefinite" />
                    </circle>
                  </svg>`
        },
        {
            id: 'ex_10',
            name: 'Elevação Lateral de Ombros',
            category: 'ombros',
            muscle: 'Deltóide Lateral',
            equipment: 'Halteres',
            calories: 75,
            sets: '3 séries de 12-15 reps',
            desc: 'Eleve os halteres lateralmente até a altura dos ombros com uma leve flexão nos cotovelos, controlando a descida.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <circle cx="50" cy="35" r="7" fill="#FF7555" />
                    <line x1="50" y1="42" x2="50" y2="78" stroke="#334155" stroke-width="5" />
                    <line x1="50" y1="45" x2="25" y2="65" stroke="#FFA629" stroke-width="4">
                        <animate attributeName="y2" values="65;45;65" dur="1.8s" repeatCount="indefinite" />
                    </line>
                    <line x1="50" y1="45" x2="75" y2="65" stroke="#FFA629" stroke-width="4">
                        <animate attributeName="y2" values="65;45;65" dur="1.8s" repeatCount="indefinite" />
                    </line>
                  </svg>`
        },
        {
            id: 'ex_11',
            name: 'Prancha Abdominal (Plank)',
            category: 'core',
            muscle: 'Core, Abdômen e Lombar',
            equipment: 'Colchonete',
            calories: 70,
            sets: '3 séries de 45-60 seg',
            desc: 'Apoie os antebraços e pontas dos pés no chão. Mantenha o corpo em linha reta e o abdômen totalmente contraído.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <line x1="15" y1="75" x2="85" y2="75" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round" />
                    <line x1="25" y1="58" x2="75" y2="58" stroke="#7048E8" stroke-width="6" stroke-linecap="round" />
                    <circle cx="78" cy="54" r="6" fill="#FF7555" />
                    <line x1="30" y1="58" x2="30" y2="75" stroke="#333" stroke-width="3" />
                  </svg>`
        },
        {
            id: 'ex_12',
            name: 'Burpee / Cardio HIIT',
            category: 'cardio',
            muscle: 'Corpo Inteiro e Resistência',
            equipment: 'Peso Corporal',
            calories: 160,
            sets: '4 séries de 15 reps',
            desc: 'Agache, apoie as mãos, jogue os pés para trás em flexão, retorne os pés e dê um salto vertical com palmas acima da cabeça.',
            svg: `<svg viewBox="0 0 100 100" class="exercise-animated-svg">
                    <circle cx="50" cy="20" r="7" fill="#FF7555">
                        <animate attributeName="cy" values="20;55;15;20" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <line x1="50" y1="28" x2="50" y2="55" stroke="#FF5A73" stroke-width="4">
                        <animate attributeName="y1" values="28;58;22;28" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="55;75;48;55" dur="2s" repeatCount="indefinite" />
                    </line>
                  </svg>`
        }
    ];

    // -------------------------------------------------------------
    // DEFAULT ROUTINES
    // -------------------------------------------------------------
    const DEFAULT_ROUTINES = [
        {
            id: 'rout_1',
            name: 'Treino A: Peitoral & Tríceps',
            day: 'Segunda-feira',
            focus: 'Hipertrofia',
            duration: 45,
            calories: 380,
            exerciseIds: ['ex_1', 'ex_2', 'ex_8', 'ex_9']
        },
        {
            id: 'rout_2',
            name: 'Treino B: Costas & Bíceps',
            day: 'Quarta-feira',
            focus: 'Hipertrofia',
            duration: 45,
            calories: 360,
            exerciseIds: ['ex_3', 'ex_4', 'ex_7', 'ex_10']
        },
        {
            id: 'rout_3',
            name: 'Treino C: Pernas & Core',
            day: 'Sexta-feira',
            focus: 'Força & Resistência',
            duration: 50,
            calories: 420,
            exerciseIds: ['ex_5', 'ex_6', 'ex_11', 'ex_12']
        }
    ];

    // -------------------------------------------------------------
    // DEFAULT FOOD DATABASE
    // -------------------------------------------------------------
    const DEFAULT_FOOD_DATABASE = [
        { id: 'f1', name: 'Tea, Bread & Egg', calories: 205, protein: 14.5, carbs: 22.0, fat: 6.5, slot: 'breakfast', time: '8:00 AM' },
        { id: 'f2', name: 'One Fresh Apple', calories: 72, protein: 0.4, carbs: 19.0, fat: 0.2, slot: 'breakfast', time: '8:30 AM' },
        { id: 'f3', name: 'Whey Protein Shake', calories: 140, protein: 26.0, carbs: 3.5, fat: 1.5, slot: 'breakfast', time: '8:45 AM' },
        { id: 'f4', name: 'Salmon with Avocado & Salad', calories: 525, protein: 38.0, carbs: 12.0, fat: 32.0, slot: 'lunch', time: '12:30 PM' },
        { id: 'f5', name: 'Grilled Chicken & Quinoa', calories: 420, protein: 42.0, carbs: 35.0, fat: 8.0, slot: 'lunch', time: '1:15 PM' },
        { id: 'f6', name: 'Greek Yogurt with Berries', calories: 160, protein: 15.0, carbs: 18.0, fat: 2.5, slot: 'lunch', time: '2:00 PM' },
        { id: 'f7', name: 'Dates with Roasted Chicken', calories: 345, protein: 32.0, carbs: 28.0, fat: 9.0, slot: 'dinner', time: '7:30 PM' },
        { id: 'f8', name: 'Steamed Broccoli & Tofu Bowl', calories: 280, protein: 22.0, carbs: 16.0, fat: 12.0, slot: 'dinner', time: '8:00 PM' },
        { id: 'f9', name: 'Almonds & Dark Chocolate', calories: 190, protein: 5.0, carbs: 14.0, fat: 13.0, slot: 'dinner', time: '8:30 PM' }
    ];

    // -------------------------------------------------------------
    // DEFAULT PROFILES
    // -------------------------------------------------------------
    const DEFAULT_PROFILES = [
        {
            id: 'p_1',
            name: 'Juliana',
            avatar: '👩‍🦰',
            age: 28,
            height: 168,
            weight: 75.0,
            weightGoal: 65.0,
            gastoCalorico: 2000,
            waterIntake: 2100,
            waterGoal: 3500,
            exerciseMinutes: 45,
            exerciseGoal: 60,
            objective: 'perda_peso',
            hydrationAlarmEnabled: true,
            hydrationIntervalMins: 60,
            hydrationVolumeMl: 250,
            hydrationStartTime: '08:00',
            hydrationEndTime: '22:00',
            routines: DEFAULT_ROUTINES,
            foods: [
                { id: 'f1', name: 'Tea, Bread & Egg', calories: 205, protein: 14.5, carbs: 22.0, fat: 6.5, slot: 'breakfast', qty: 1, time: '8:00 AM' },
                { id: 'f2', name: 'One Fresh Apple', calories: 72, protein: 0.4, carbs: 19.0, fat: 0.2, slot: 'breakfast', qty: 1, time: '8:30 AM' },
                { id: 'f4', name: 'Salmon, Mix Veggies, Avocado', calories: 525, protein: 38.0, carbs: 12.0, fat: 32.0, slot: 'lunch', qty: 1, time: '12:30 PM' },
                { id: 'f7', name: 'Dates, Chicken Pickle', calories: 345, protein: 32.0, carbs: 28.0, fat: 9.0, slot: 'dinner', qty: 1, time: '7:30 PM' }
            ]
        },
        {
            id: 'p_2',
            name: 'Carlos',
            avatar: '👨‍🦱',
            age: 32,
            height: 178,
            weight: 84.0,
            weightGoal: 78.0,
            gastoCalorico: 2400,
            waterIntake: 2750,
            waterGoal: 4000,
            exerciseMinutes: 60,
            exerciseGoal: 60,
            objective: 'ganho_massa',
            hydrationAlarmEnabled: true,
            hydrationIntervalMins: 45,
            hydrationVolumeMl: 250,
            hydrationStartTime: '08:00',
            hydrationEndTime: '22:00',
            routines: DEFAULT_ROUTINES,
            foods: [
                { id: 'f3', name: 'Whey Protein Shake', calories: 140, protein: 26.0, carbs: 3.5, fat: 1.5, slot: 'breakfast', qty: 2, time: '7:30 AM' },
                { id: 'f5', name: 'Grilled Chicken & Quinoa', calories: 420, protein: 42.0, carbs: 35.0, fat: 8.0, slot: 'lunch', qty: 1, time: '12:45 PM' },
                { id: 'f7', name: 'Dates with Roasted Chicken', calories: 345, protein: 32.0, carbs: 28.0, fat: 9.0, slot: 'dinner', qty: 1, time: '8:00 PM' }
            ]
        }
    ];

    // -------------------------------------------------------------
    // APPLICATION STATE
    // -------------------------------------------------------------
    let state = {
        currentView: 'view-dashboard',
        selectedSlotForAdd: 'breakfast',
        
        // Date management
        selectedYear: 2026,
        selectedMonth: 7, // August
        selectedDay: 28,

        // Workout state
        activeMuscleFilter: 'all',
        currentPlayingRoutine: null,

        // Hydration alarm runtime
        nextHydrationTargetTime: Date.now() + 60 * 60 * 1000,

        // Profiles
        profiles: JSON.parse(localStorage.getItem('hc_profiles_list')) || DEFAULT_PROFILES,
        activeProfileId: localStorage.getItem('hc_active_profile_id') || 'p_1'
    };

    function getActiveProfile() {
        let profile = state.profiles.find(p => p.id === state.activeProfileId);
        if (!profile && state.profiles.length > 0) {
            profile = state.profiles[0];
            state.activeProfileId = profile.id;
        }
        if (profile) {
            if (!profile.routines) profile.routines = DEFAULT_ROUTINES;
            if (profile.hydrationAlarmEnabled === undefined) profile.hydrationAlarmEnabled = true;
            if (!profile.hydrationIntervalMins) profile.hydrationIntervalMins = 60;
            if (!profile.hydrationVolumeMl) profile.hydrationVolumeMl = 250;
            if (!profile.hydrationStartTime) profile.hydrationStartTime = '08:00';
            if (!profile.hydrationEndTime) profile.hydrationEndTime = '22:00';
        }
        return profile || DEFAULT_PROFILES[0];
    }

    function saveState() {
        localStorage.setItem('hc_profiles_list', JSON.stringify(state.profiles));
        localStorage.setItem('hc_active_profile_id', state.activeProfileId);
    }

    let dadosSugestoes = { dietas: {}, exercicios: {} };

    // Load diet & exercise data from dados.json
    fetch('dados.json')
        .then(res => res.json())
        .then(data => {
            dadosSugestoes = data;
            renderSuggestions();
        })
        .catch(err => console.error('Erro ao carregar dados.json:', err));

    // -------------------------------------------------------------
    // CALCULATIONS & TOTALS
    // -------------------------------------------------------------
    function calculateTotals() {
        const profile = getActiveProfile();
        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;

        const foods = profile.foods || [];

        foods.forEach(item => {
            const qty = item.qty || 1;
            calories += item.calories * qty;
            protein += item.protein * qty;
            carbs += item.carbs * qty;
            fat += item.fat * qty;
        });

        const slotTotals = {
            breakfast: { calories: 0, items: [] },
            lunch: { calories: 0, items: [] },
            dinner: { calories: 0, items: [] }
        };

        foods.forEach(item => {
            const slot = item.slot || 'breakfast';
            if (slotTotals[slot]) {
                const qty = item.qty || 1;
                slotTotals[slot].calories += item.calories * qty;
                slotTotals[slot].items.push(item);
            }
        });

        return {
            totalCalories: Math.round(calories),
            totalProtein: Math.round(protein * 10) / 10,
            totalCarbs: Math.round(carbs * 10) / 10,
            totalFat: Math.round(fat * 10) / 10,
            foodCount: foods.length,
            slotTotals
        };
    }

    // -------------------------------------------------------------
    // UI RENDERING
    // -------------------------------------------------------------
    function renderApp() {
        const profile = getActiveProfile();
        const totals = calculateTotals();

        // 1. Render Header Greeting & Profile Info
        const avatarEl = document.getElementById('user-avatar-display');
        const greetingNameEl = document.getElementById('greeting-user-name');
        const greetingStatusEl = document.getElementById('greeting-status');
        const notifyDotEl = document.getElementById('notify-badge-dot');

        if (avatarEl) avatarEl.innerHTML = `<span>${profile.avatar || '👩‍🦰'}</span>`;
        if (greetingNameEl) greetingNameEl.textContent = profile.name || 'Usuário';
        if (greetingStatusEl) {
            greetingStatusEl.textContent = `Meta: ${profile.weightGoal}kg • ${profile.height}cm • ${profile.age} anos`;
        }

        if (notifyDotEl) {
            if (profile.hydrationAlarmEnabled) {
                notifyDotEl.classList.add('active');
            } else {
                notifyDotEl.classList.remove('active');
            }
        }

        // 2. Render Date Badges
        const currentMonthName = MONTH_NAMES[state.selectedMonth] || 'August';
        const fullDateStr = `${currentMonthName} ${state.selectedDay} ${state.selectedYear}`;
        
        const dateBadgeText = document.getElementById('display-date-text');
        if (dateBadgeText) dateBadgeText.textContent = fullDateStr;

        // 3. Render 4 Metric Cards
        // Water
        const waterValEl = document.getElementById('card-water-value');
        const waterGoalEl = document.getElementById('card-water-goal');
        if (waterValEl) waterValEl.textContent = `${profile.waterIntake || 0} ml`;
        if (waterGoalEl) waterGoalEl.textContent = `Daily goal ${((profile.waterGoal || 3500) / 1000).toFixed(1)}L`;

        // Weight
        const weightValEl = document.getElementById('card-weight-value');
        const weightGoalEl = document.getElementById('card-weight-goal');
        const weightArcEl = document.getElementById('weight-gauge-arc');
        if (weightValEl) weightValEl.textContent = `${profile.weight} kg`;
        if (weightGoalEl) weightGoalEl.textContent = `Goal ${profile.weightGoal}kg`;
        
        if (weightArcEl) {
            const weightRatio = Math.min(Math.max((profile.weight - 40) / 60, 0.1), 0.95);
            const offset = 142 * (1 - weightRatio);
            weightArcEl.style.strokeDashoffset = offset;
        }

        // Calories
        const calValEl = document.getElementById('card-calories-value');
        const calLeftEl = document.getElementById('card-calories-left');
        const calArcEl = document.getElementById('calories-arc');
        const leftKcal = Math.max((profile.gastoCalorico || 2000) - totals.totalCalories, 0);
        
        if (calValEl) calValEl.textContent = `${totals.totalCalories} kcal`;
        if (calLeftEl) calLeftEl.textContent = `Left ${leftKcal} kcal`;
        
        if (calArcEl) {
            const calRatio = Math.min(totals.totalCalories / (profile.gastoCalorico || 2000), 1);
            const calOffset = 126 * (1 - calRatio);
            calArcEl.style.strokeDashoffset = calOffset;
        }

        // Exercício / Atividade
        const exerciseValEl = document.getElementById('card-exercise-value');
        const exerciseGoalEl = document.getElementById('card-exercise-goal');
        const exerciseBarProgress = document.getElementById('exercise-bar-progress');
        const exercisePin = document.getElementById('exercise-pin');

        const exMins = profile.exerciseMinutes || 0;
        const exGoal = profile.exerciseGoal || 60;

        if (exerciseValEl) exerciseValEl.textContent = `${exMins} min`;
        if (exerciseGoalEl) exerciseGoalEl.textContent = `Meta diária ${exGoal} min`;

        if (exerciseBarProgress && exercisePin) {
            const exRatio = Math.min(exMins / exGoal, 1);
            const barWidth = Math.max(exRatio * 100, 10);
            exerciseBarProgress.setAttribute('width', barWidth);
            exercisePin.setAttribute('cx', 10 + barWidth);
        }

        // 4. Render Dashboard Meals
        renderDashboardMeals(totals.slotTotals);

        // 5. Render Activities View
        renderActivities(totals, profile, currentMonthName);

        // 6. Render Meal Planner View
        renderMealPlanner(totals.slotTotals);

        // 7. Render Workouts View (New Feature)
        renderWorkoutsView(profile);

        // 8. Render Suggestions & Goals View
        renderSuggestionsView(totals, profile);
    }

    // Render Dashboard Meals
    function renderDashboardMeals(slotTotals) {
        const container = document.getElementById('dashboard-meals-container');
        if (!container) return;

        const mealMeta = {
            breakfast: { name: 'Breakfast', icon: '🥞', time: '7-9:00 AM' },
            lunch: { name: 'Lunch', icon: '🥗', time: '12-2:00 PM' },
            dinner: { name: 'Dinner', icon: '🥑', time: '7-8:30 PM' }
        };

        container.innerHTML = '';

        Object.keys(mealMeta).forEach(slotKey => {
            const meta = mealMeta[slotKey];
            const data = slotTotals[slotKey] || { calories: 0, items: [] };
            
            const card = document.createElement('div');
            card.className = 'meal-dashboard-card';
            
            const itemsText = data.items.length > 0 
                ? data.items.map(i => i.name).join(', ')
                : 'Nenhum alimento registrado';

            card.innerHTML = `
                <div class="meal-info-col">
                    <div class="meal-name-row">
                        <span class="meal-name">${meta.name}</span>
                        <span class="meal-time-tag">${meta.time}</span>
                    </div>
                    <div class="meal-items-preview" title="${itemsText}">${itemsText}</div>
                    <div class="meal-cal-tag">🔥 ${data.calories} kcal</div>
                </div>
                <div class="meal-right-col">
                    <button class="btn-add-food-quick" data-slot="${slotKey}" title="Adicionar alimento">+</button>
                </div>
            `;

            container.appendChild(card);
        });

        container.querySelectorAll('.btn-add-food-quick').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const slot = e.currentTarget.getAttribute('data-slot');
                openAddFoodModal(slot);
            });
        });
    }

    // Render Activities & Nutrient Chart
    function renderActivities(totals, profile, currentMonthName) {
        const actPill = document.getElementById('act-total-calories-pill');
        const foodsSummary = document.getElementById('act-foods-summary');

        if (actPill) actPill.textContent = `${totals.totalCalories} Kcal`;
        
        const remaining = Math.max((profile.gastoCalorico || 2000) - totals.totalCalories, 0);
        if (foodsSummary) {
            foodsSummary.innerHTML = `${currentMonthName} ${state.selectedDay} • <span id="act-foods-count">${totals.foodCount} Foods</span> • <span id="act-calories-remaining">${remaining} Kcal remaining</span>`;
        }

        const targetCal = profile.gastoCalorico || 2000;
        const targetCarbs = 250;
        const targetFat = 65;
        const targetProt = 140;

        const pctCal = Math.min(Math.round((totals.totalCalories / targetCal) * 100), 100);
        const pctCarbs = Math.min(Math.round((totals.totalCarbs / targetCarbs) * 100), 100);
        const pctFat = Math.min(Math.round((totals.totalFat / targetFat) * 100), 100);
        const pctProt = Math.min(Math.round((totals.totalProtein / targetProt) * 100), 100);

        setMacroCard('cal', pctCal, `${totals.totalCalories} / ${targetCal} kcal`);
        setMacroCard('carbs', pctCarbs, `${totals.totalCarbs} / ${targetCarbs}g`);
        setMacroCard('fat', pctFat, `${totals.totalFat} / ${targetFat}g`);
        setMacroCard('prot', pctProt, `${totals.totalProtein} / ${targetProt}g`);

        renderWaterGlasses(profile);
        renderNutritionCurvesChart(totals);
    }

    function setMacroCard(type, pct, detail) {
        const pctEl = document.getElementById(`macro-pct-${type}`);
        const barEl = document.getElementById(`bar-${type}`);
        const detailEl = document.getElementById(`macro-detail-${type}`);

        if (pctEl) pctEl.textContent = `${pct}%`;
        if (barEl) barEl.style.width = `${pct}%`;
        if (detailEl) detailEl.textContent = detail;
    }

    function renderWaterGlasses(profile) {
        const container = document.getElementById('water-glasses-container');
        const subtext = document.getElementById('act-water-sub');
        if (!container) return;

        const intake = profile.waterIntake || 0;
        const goal = profile.waterGoal || 3500;

        const totalGlasses = 8;
        const filledGlasses = Math.min(Math.floor(intake / 250), totalGlasses);

        if (subtext) {
            subtext.textContent = `${(intake / 1000).toFixed(1)} L / ${(goal / 1000).toFixed(1)} liter`;
        }

        container.innerHTML = '';
        for (let i = 1; i <= totalGlasses; i++) {
            const isFilled = i <= filledGlasses;
            const glassItem = document.createElement('div');
            glassItem.className = `water-glass-item ${isFilled ? 'filled' : 'empty'}`;
            glassItem.title = `${i * 250} ml`;
            
            glassItem.innerHTML = `
                <svg class="glass-icon-svg" viewBox="0 0 24 34">
                    <path class="glass-body" d="M 4 4 L 7 28 C 7 30 9 32 12 32 C 15 32 17 30 17 28 L 20 4 Z" fill="#E8F4FC" stroke="#BCE0F7" stroke-width="1.5" />
                    <path class="glass-fill" d="M ${isFilled ? '5.5' : '6'} ${isFilled ? '12' : '26'} L 7 28 C 7 30 9 32 12 32 C 15 32 17 30 17 28 L ${isFilled ? '18.5' : '18'} ${isFilled ? '12' : '26'} Z" />
                    <line x1="3" y1="4" x2="21" y2="4" stroke="#85C7F5" stroke-width="2" stroke-linecap="round" />
                </svg>
            `;

            glassItem.addEventListener('click', () => {
                profile.waterIntake = i * 250;
                saveState();
                renderApp();
            });

            container.appendChild(glassItem);
        }
    }

    function renderNutritionCurvesChart(totals) {
        const breakfast = totals.slotTotals.breakfast || { calories: 200, protein: 15, carbs: 25, fat: 8 };
        const lunch = totals.slotTotals.lunch || { calories: 500, protein: 40, carbs: 35, fat: 20 };
        const dinner = totals.slotTotals.dinner || { calories: 350, protein: 30, carbs: 20, fat: 12 };

        function mapY(val, max) {
            const ratio = Math.min(Math.max(val / max, 0), 1);
            return 160 - (ratio * 125);
        }

        const calPoints = [
            { x: 30, y: mapY(breakfast.calories * 0.4, 700) },
            { x: 110, y: mapY(breakfast.calories, 700) },
            { x: 210, y: mapY(lunch.calories, 700) },
            { x: 310, y: mapY(dinner.calories, 700) }
        ];

        const carbsPoints = [
            { x: 30, y: mapY(15, 80) },
            { x: 110, y: mapY(totals.totalCarbs * 0.4, 80) },
            { x: 210, y: mapY(totals.totalCarbs * 0.7, 80) },
            { x: 310, y: mapY(totals.totalCarbs, 80) }
        ];

        const fatPoints = [
            { x: 30, y: mapY(8, 60) },
            { x: 110, y: mapY(totals.totalFat * 0.3, 60) },
            { x: 210, y: mapY(totals.totalFat * 0.8, 60) },
            { x: 310, y: mapY(totals.totalFat, 60) }
        ];

        const proteinPoints = [
            { x: 30, y: mapY(10, 80) },
            { x: 110, y: mapY(totals.totalProtein * 0.3, 80) },
            { x: 210, y: mapY(totals.totalProtein * 0.7, 80) },
            { x: 310, y: mapY(totals.totalProtein, 80) }
        ];

        function createCurvedPath(pts) {
            if (pts.length < 2) return '';
            let d = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[i];
                const p1 = pts[i + 1];
                const cpX = (p0.x + p1.x) / 2;
                d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
            }
            return d;
        }

        function createAreaPath(pts) {
            const linePath = createCurvedPath(pts);
            if (!linePath) return '';
            return `${linePath} L ${pts[pts.length - 1].x} 165 L ${pts[0].x} 165 Z`;
        }

        setPathData('path-line-calory', 'path-area-calory', calPoints, createCurvedPath, createAreaPath);
        setPathData('path-line-carbs', 'path-area-carbs', carbsPoints, createCurvedPath, createAreaPath);
        setPathData('path-line-fat', 'path-area-fat', fatPoints, createCurvedPath, createAreaPath);
        setPathData('path-line-protein', 'path-area-protein', proteinPoints, createCurvedPath, createAreaPath);

        const dotsGroup = document.getElementById('chart-dots-group');
        if (dotsGroup) {
            dotsGroup.innerHTML = '';
            const highlightPts = [
                { pt: calPoints[2], color: '#FF7A59' },
                { pt: carbsPoints[2], color: '#E64980' },
                { pt: fatPoints[2], color: '#7048E8' },
                { pt: proteinPoints[2], color: '#40C057' }
            ];

            highlightPts.forEach(item => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', item.pt.x);
                circle.setAttribute('cy', item.pt.y);
                circle.setAttribute('r', '4.5');
                circle.setAttribute('fill', '#FFFFFF');
                circle.setAttribute('stroke', item.color);
                circle.setAttribute('stroke-width', '2.5');
                dotsGroup.appendChild(circle);
            });
        }
    }

    function setPathData(lineId, areaId, points, createCurvedPath, createAreaPath) {
        const lineEl = document.getElementById(lineId);
        const areaEl = document.getElementById(areaId);
        if (lineEl) lineEl.setAttribute('d', createCurvedPath(points));
        if (areaEl) areaEl.setAttribute('d', createAreaPath(points));
    }

    // -------------------------------------------------------------
    // MEAL PLANNER: DYNAMIC MONTHS & DAYS CALENDAR
    // -------------------------------------------------------------
    function renderMealPlanner(slotTotals) {
        const profile = getActiveProfile();

        document.querySelectorAll('.month-item').forEach(mEl => {
            const mIdx = parseInt(mEl.getAttribute('data-month'));
            if (mIdx === state.selectedMonth) {
                mEl.classList.add('active');
            } else {
                mEl.classList.remove('active');
            }
        });

        renderDaysCarousel();

        const slots = ['breakfast', 'lunch', 'dinner'];
        
        slots.forEach(slotKey => {
            const data = slotTotals[slotKey] || { calories: 0, items: [] };
            
            const badgeEl = document.getElementById(`badge-cal-${slotKey}`);
            if (badgeEl) badgeEl.textContent = `🔥 ${data.calories} kcal`;

            const sumEl = document.getElementById(`summary-${slotKey}`);
            if (sumEl) {
                sumEl.textContent = data.items.length > 0 
                    ? data.items.map(i => i.name).join(', ')
                    : 'Nenhum alimento cadastrado';
            }

            const container = document.getElementById(`items-${slotKey}`);
            if (!container) return;

            container.innerHTML = '';
            data.items.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'slot-item-row';
                
                itemRow.innerHTML = `
                    <div class="slot-item-info">
                        <span class="slot-item-name">${item.name}</span>
                        <span class="slot-item-time">${item.time || ''}</span>
                    </div>
                    <div class="slot-item-controls">
                        <div class="portion-ctrl">
                            <button class="btn-qty btn-minus" title="Diminuir porção">-</button>
                            <span class="qty-val">${item.qty || 1}</span>
                            <button class="btn-qty btn-plus" title="Aumentar porção">+</button>
                        </div>
                        <button class="btn-del-item" title="Remover item">&times;</button>
                    </div>
                `;

                const btnMinus = itemRow.querySelector('.btn-minus');
                const btnPlus = itemRow.querySelector('.btn-plus');
                const btnDel = itemRow.querySelector('.btn-del-item');

                btnMinus.addEventListener('click', () => {
                    if ((item.qty || 1) > 1) {
                        item.qty -= 1;
                    } else {
                        profile.foods = profile.foods.filter(f => f !== item);
                    }
                    saveState();
                    renderApp();
                });

                btnPlus.addEventListener('click', () => {
                    item.qty = (item.qty || 1) + 1;
                    saveState();
                    renderApp();
                });

                btnDel.addEventListener('click', () => {
                    profile.foods = profile.foods.filter(f => f !== item);
                    saveState();
                    renderApp();
                });

                container.appendChild(itemRow);
            });
        });
    }

    function renderDaysCarousel() {
        const daysCarousel = document.getElementById('days-carousel');
        if (!daysCarousel) return;

        daysCarousel.innerHTML = '';
        const daysInMonth = new Date(state.selectedYear, state.selectedMonth + 1, 0).getDate();
        
        if (state.selectedDay > daysInMonth) {
            state.selectedDay = daysInMonth;
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(state.selectedYear, state.selectedMonth, d);
            const dayName = DAY_NAMES_SHORT[dateObj.getDay()];

            const chip = document.createElement('div');
            chip.className = `day-chip ${d === state.selectedDay ? 'active' : ''}`;
            chip.setAttribute('data-day', d);

            chip.innerHTML = `
                <span class="day-name">${dayName}</span>
                <span class="day-num">${d}</span>
            `;

            chip.addEventListener('click', () => {
                state.selectedDay = d;
                renderApp();
            });

            daysCarousel.appendChild(chip);
        }

        setTimeout(() => {
            const activeChip = daysCarousel.querySelector('.day-chip.active');
            if (activeChip) {
                activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }, 50);
    }

    document.querySelectorAll('.month-item').forEach(monthEl => {
        monthEl.addEventListener('click', (e) => {
            const mIdx = parseInt(e.currentTarget.getAttribute('data-month'));
            state.selectedMonth = mIdx;
            e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            renderApp();
        });
    });

    // -------------------------------------------------------------
    // WORKOUTS VIEW & EXERCISE LIBRARY (NOVA ABA)
    // -------------------------------------------------------------
    function renderWorkoutsView(profile) {
        const routines = profile.routines || DEFAULT_ROUTINES;

        // 1. Highlight Banner Routine
        const bannerRoutine = routines[0] || DEFAULT_ROUTINES[0];
        const bannerTitle = document.getElementById('banner-routine-name');
        const bannerMeta = document.getElementById('banner-routine-meta');
        const btnStartBanner = document.getElementById('btn-start-banner-workout');

        if (bannerTitle) bannerTitle.textContent = bannerRoutine.name;
        if (bannerMeta) bannerMeta.textContent = `${bannerRoutine.exerciseIds.length} Exercícios • ~${bannerRoutine.duration || 45} min • ~${bannerRoutine.calories || 380} kcal`;

        if (btnStartBanner) {
            btnStartBanner.onclick = () => openWorkoutPlayer(bannerRoutine);
        }

        // 2. Render Saved Routines List
        const routinesContainer = document.getElementById('routines-list-container');
        if (routinesContainer) {
            routinesContainer.innerHTML = '';
            routines.forEach(routine => {
                const rCard = document.createElement('div');
                rCard.className = 'routine-item-card';

                rCard.innerHTML = `
                    <div class="routine-card-info">
                        <span class="routine-card-title">${routine.name}</span>
                        <div class="routine-card-tags">
                            <span class="routine-chip-tag">📅 ${routine.day || 'Personalizado'}</span>
                            <span class="routine-chip-tag">⚡ ${routine.focus || 'Hipertrofia'}</span>
                            <span class="routine-chip-tag">⏱️ ~${routine.duration || 45} min</span>
                        </div>
                    </div>
                    <button class="btn-play-routine" title="Executar treino">▶</button>
                `;

                rCard.querySelector('.btn-play-routine').addEventListener('click', () => {
                    openWorkoutPlayer(routine);
                });

                routinesContainer.appendChild(rCard);
            });
        }

        // 3. Render Visual Exercise Library with SVGs
        renderExerciseLibrary();
    }

    function renderExerciseLibrary() {
        const container = document.getElementById('exercises-library-container');
        const badgeCount = document.getElementById('exercise-count-badge');
        if (!container) return;

        container.innerHTML = '';

        const filter = state.activeMuscleFilter;
        const filtered = filter === 'all' 
            ? EXERCISES_DATABASE 
            : EXERCISES_DATABASE.filter(ex => ex.category === filter);

        if (badgeCount) badgeCount.textContent = `${filtered.length} exercícios`;

        filtered.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-library-card';

            card.innerHTML = `
                <div class="exercise-card-media">
                    ${ex.svg}
                </div>
                <h4 class="exercise-card-title">${ex.name}</h4>
                <span class="exercise-card-muscle">${ex.muscle}</span>
                <div class="exercise-card-footer">
                    <span>🔥 ~${ex.calories} kcal</span>
                    <span>${ex.equipment}</span>
                </div>
            `;

            card.addEventListener('click', () => openExerciseDetail(ex));
            container.appendChild(card);
        });
    }

    // Muscle group filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.activeMuscleFilter = e.currentTarget.getAttribute('data-filter');
            renderExerciseLibrary();
        });
    });

    // -------------------------------------------------------------
    // WORKOUT PLAYER & REST TIMER LOGIC
    // -------------------------------------------------------------
    const modalPlayer = document.getElementById('modal-workout-player');
    const playerTitle = document.getElementById('player-routine-title');
    const playerSubtitle = document.getElementById('player-routine-subtitle');
    const playerExercisesContainer = document.getElementById('player-exercises-container');
    const btnClosePlayer = document.getElementById('btn-close-player-modal');
    const btnFinishWorkout = document.getElementById('btn-finish-workout');

    // Rest Timer variables
    let restTimerInterval = null;
    let restTimeRemaining = 45;
    let isTimerRunning = false;

    const timerClockEl = document.getElementById('player-timer-clock');
    const btnToggleTimer = document.getElementById('btn-toggle-rest-timer');

    function openWorkoutPlayer(routine) {
        state.currentPlayingRoutine = routine;

        if (playerTitle) playerTitle.textContent = routine.name;
        if (playerSubtitle) playerSubtitle.textContent = `${routine.exerciseIds.length} exercícios programados • ~${routine.duration || 45} min`;

        renderPlayerExercises(routine);
        resetRestTimer(45);

        if (modalPlayer) modalPlayer.classList.add('open');
    }

    function closeWorkoutPlayer() {
        clearInterval(restTimerInterval);
        isTimerRunning = false;
        if (btnToggleTimer) btnToggleTimer.textContent = '▶ Iniciar';
        if (modalPlayer) modalPlayer.classList.remove('open');
    }

    function renderPlayerExercises(routine) {
        if (!playerExercisesContainer) return;
        playerExercisesContainer.innerHTML = '';

        const routineExercises = EXERCISES_DATABASE.filter(ex => routine.exerciseIds.includes(ex.id));

        routineExercises.forEach((ex, exIdx) => {
            const card = document.createElement('div');
            card.className = 'player-ex-card';

            card.innerHTML = `
                <div class="player-ex-header">
                    <div class="player-ex-thumb">${ex.svg}</div>
                    <div>
                        <h4 class="player-ex-title">${exIdx + 1}. ${ex.name}</h4>
                        <p class="player-ex-sub">${ex.sets} • ${ex.equipment}</p>
                    </div>
                </div>
                <div class="sets-checklist-row">
                    <div class="set-check-item" data-set="1"><span>✓</span> Série 1 (12 reps)</div>
                    <div class="set-check-item" data-set="2"><span>✓</span> Série 2 (10 reps)</div>
                    <div class="set-check-item" data-set="3"><span>✓</span> Série 3 (10 reps)</div>
                    <div class="set-check-item" data-set="4"><span>✓</span> Série 4 (8 reps)</div>
                </div>
            `;

            card.querySelectorAll('.set-check-item').forEach(setItem => {
                setItem.addEventListener('click', (e) => {
                    e.currentTarget.classList.toggle('done');
                    // Automatically trigger rest timer on completing set
                    if (e.currentTarget.classList.contains('done')) {
                        startRestTimer();
                    }
                });
            });

            playerExercisesContainer.appendChild(card);
        });
    }

    function updateTimerDisplay() {
        if (!timerClockEl) return;
        const mins = Math.floor(restTimeRemaining / 60);
        const secs = restTimeRemaining % 60;
        timerClockEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function resetRestTimer(seconds) {
        clearInterval(restTimerInterval);
        isTimerRunning = false;
        restTimeRemaining = seconds;
        updateTimerDisplay();
        if (btnToggleTimer) btnToggleTimer.textContent = '▶ Iniciar';
    }

    function startRestTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;
        if (btnToggleTimer) btnToggleTimer.textContent = '⏸ Pausar';

        clearInterval(restTimerInterval);
        restTimerInterval = setInterval(() => {
            if (restTimeRemaining > 0) {
                restTimeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(restTimerInterval);
                isTimerRunning = false;
                if (btnToggleTimer) btnToggleTimer.textContent = '🔄 Reiniciar';
                // Beep / alert feedback
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([200, 100, 200]);
                }
            }
        }, 1000);
    }

    function toggleRestTimer() {
        if (isTimerRunning) {
            clearInterval(restTimerInterval);
            isTimerRunning = false;
            if (btnToggleTimer) btnToggleTimer.textContent = '▶ Continuar';
        } else {
            if (restTimeRemaining === 0) restTimeRemaining = 45;
            startRestTimer();
        }
    }

    if (btnToggleTimer) btnToggleTimer.addEventListener('click', toggleRestTimer);

    document.querySelectorAll('.btn-timer-preset').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-timer-preset').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const sec = parseInt(e.currentTarget.getAttribute('data-seconds'));
            resetRestTimer(sec);
        });
    });

    if (btnClosePlayer) btnClosePlayer.addEventListener('click', closeWorkoutPlayer);

    // Finish Workout Button
    if (btnFinishWorkout) {
        btnFinishWorkout.addEventListener('click', () => {
            const profile = getActiveProfile();
            const routine = state.currentPlayingRoutine || DEFAULT_ROUTINES[0];

            const addedMins = routine.duration || 45;
            profile.exerciseMinutes = (profile.exerciseMinutes || 0) + addedMins;

            saveState();
            renderApp();
            closeWorkoutPlayer();

            alert(`🎉 Parabéns! Treino "${routine.name}" concluído com sucesso!\n+${addedMins} min de atividade registrados no seu Dashboard!`);
        });
    }

    // -------------------------------------------------------------
    // EXERCISE DETAIL MODAL
    // -------------------------------------------------------------
    const modalExerciseDetail = document.getElementById('modal-exercise-detail');
    const detailTitle = document.getElementById('detail-exercise-title');
    const detailBody = document.getElementById('exercise-detail-body');
    const btnCloseDetail = document.getElementById('btn-close-detail-modal');

    function openExerciseDetail(ex) {
        if (detailTitle) detailTitle.textContent = ex.name;
        if (detailBody) {
            detailBody.innerHTML = `
                <div class="exercise-detail-anim-wrap">
                    <div style="width: 130px; height: 130px;">
                        ${ex.svg}
                    </div>
                </div>

                <div class="exercise-detail-meta-grid">
                    <div class="meta-box">
                        <span class="meta-box-label">Grupo Muscular</span>
                        <span class="meta-box-val">${ex.muscle}</span>
                    </div>
                    <div class="meta-box">
                        <span class="meta-box-label">Gasto Estimado</span>
                        <span class="meta-box-val">🔥 ~${ex.calories} kcal</span>
                    </div>
                    <div class="meta-box">
                        <span class="meta-box-label">Equipamento</span>
                        <span class="meta-box-val">${ex.equipment}</span>
                    </div>
                    <div class="meta-box">
                        <span class="meta-box-label">Séries Recomendadas</span>
                        <span class="meta-box-val">${ex.sets}</span>
                    </div>
                </div>

                <div class="exercise-steps-list">
                    <h4 style="margin-bottom: 8px; color: var(--text-primary);">Instruções de Execução:</h4>
                    <p>${ex.desc}</p>
                </div>

                <button class="btn-primary-pill full-width" id="btn-quick-play-ex">
                    ▶ Executar este Exercício
                </button>
            `;

            detailBody.querySelector('#btn-quick-play-ex').addEventListener('click', () => {
                closeExerciseDetail();
                openWorkoutPlayer({
                    id: 'single_' + ex.id,
                    name: ex.name,
                    exerciseIds: [ex.id],
                    duration: 15
                });
            });
        }

        if (modalExerciseDetail) modalExerciseDetail.classList.add('open');
    }

    function closeExerciseDetail() {
        if (modalExerciseDetail) modalExerciseDetail.classList.remove('open');
    }

    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeExerciseDetail);

    // -------------------------------------------------------------
    // CREATE CUSTOM ROUTINE MODAL
    // -------------------------------------------------------------
    const modalCreateRoutine = document.getElementById('modal-create-routine');
    const btnOpenNewRoutine = document.getElementById('btn-open-new-routine');
    const btnCreateRoutineLink = document.getElementById('btn-create-routine-link');
    const btnCloseRoutineModal = document.getElementById('btn-close-routine-modal');
    const formCreateRoutine = document.getElementById('form-create-routine');
    const pickerListContainer = document.getElementById('routine-exercise-picker-list');

    let selectedExerciseIdsForRoutine = ['ex_1', 'ex_2'];

    function openCreateRoutineModal() {
        selectedExerciseIdsForRoutine = ['ex_1', 'ex_2'];
        renderRoutineExercisePicker();
        if (modalCreateRoutine) modalCreateRoutine.classList.add('open');
    }

    function closeCreateRoutineModal() {
        if (modalCreateRoutine) modalCreateRoutine.classList.remove('open');
    }

    function renderRoutineExercisePicker() {
        if (!pickerListContainer) return;
        pickerListContainer.innerHTML = '';

        EXERCISES_DATABASE.forEach(ex => {
            const isSelected = selectedExerciseIdsForRoutine.includes(ex.id);
            const item = document.createElement('div');
            item.className = `picker-exercise-item ${isSelected ? 'selected' : ''}`;

            item.innerHTML = `
                <div>
                    <strong>${ex.name}</strong>
                    <span style="display:block; font-size:11px; color:var(--text-muted);">${ex.muscle}</span>
                </div>
                <span>${isSelected ? '✅' : '➕'}</span>
            `;

            item.addEventListener('click', () => {
                if (selectedExerciseIdsForRoutine.includes(ex.id)) {
                    selectedExerciseIdsForRoutine = selectedExerciseIdsForRoutine.filter(id => id !== ex.id);
                } else {
                    selectedExerciseIdsForRoutine.push(ex.id);
                }
                renderRoutineExercisePicker();
            });

            pickerListContainer.appendChild(item);
        });
    }

    if (btnOpenNewRoutine) btnOpenNewRoutine.addEventListener('click', openCreateRoutineModal);
    if (btnCreateRoutineLink) btnCreateRoutineLink.addEventListener('click', openCreateRoutineModal);
    if (btnCloseRoutineModal) btnCloseRoutineModal.addEventListener('click', closeCreateRoutineModal);

    if (formCreateRoutine) {
        formCreateRoutine.addEventListener('submit', (e) => {
            e.preventDefault();
            if (selectedExerciseIdsForRoutine.length === 0) {
                alert('Selecione pelo menos 1 exercício para a rotina!');
                return;
            }

            const profile = getActiveProfile();
            const name = document.getElementById('routine-name').value.trim();
            const day = document.getElementById('routine-day').value;
            const focus = document.getElementById('routine-focus').value;

            const newRoutine = {
                id: 'rout_' + Date.now(),
                name,
                day,
                focus,
                duration: selectedExerciseIdsForRoutine.length * 12,
                calories: selectedExerciseIdsForRoutine.length * 90,
                exerciseIds: [...selectedExerciseIdsForRoutine]
            };

            if (!profile.routines) profile.routines = [];
            profile.routines.push(newRoutine);

            saveState();
            renderApp();
            formCreateRoutine.reset();
            closeCreateRoutineModal();
            alert(`Rotina "${name}" criada com sucesso!`);
        });
    }

    // -------------------------------------------------------------
    // PROFILE MANAGEMENT
    // -------------------------------------------------------------
    const modalProfile = document.getElementById('modal-profile-manager');
    const btnOpenProfile = document.getElementById('btn-open-profile');
    const btnCloseProfile = document.getElementById('btn-close-profile-modal');
    const profilesListContainer = document.getElementById('profiles-list-container');
    const formProfileEditor = document.getElementById('form-profile-editor');
    const profileFormTitle = document.getElementById('profile-form-title');
    const btnToggleNewProfile = document.getElementById('btn-toggle-new-profile');
    const profileEditIdInput = document.getElementById('profile-edit-id');

    let selectedAvatarEmoji = '👩‍🦰';

    function openProfileModal() {
        renderProfilesList();
        resetProfileForm();
        if (modalProfile) modalProfile.classList.add('open');
    }

    function closeProfileModal() {
        if (modalProfile) modalProfile.classList.remove('open');
    }

    function renderProfilesList() {
        if (!profilesListContainer) return;
        profilesListContainer.innerHTML = '';

        state.profiles.forEach(p => {
            const isActive = p.id === state.activeProfileId;
            const pCard = document.createElement('div');
            pCard.className = `profile-card-item ${isActive ? 'active' : ''}`;

            pCard.innerHTML = `
                <div class="profile-item-left" title="Clique para ativar este perfil">
                    <div class="p-item-avatar">${p.avatar || '👩‍🦰'}</div>
                    <div class="p-item-info">
                        <span class="p-item-name">${p.name} ${isActive ? '⭐ (Ativo)' : ''}</span>
                        <span class="p-item-meta">${p.weight} kg • Meta: ${p.weightGoal} kg • ${p.gastoCalorico} kcal</span>
                    </div>
                </div>
                <div class="profile-item-actions">
                    <button class="btn-p-action btn-p-edit" title="Editar dados">✏️</button>
                    ${state.profiles.length > 1 ? '<button class="btn-p-action btn-p-del" title="Excluir perfil">🗑️</button>' : ''}
                </div>
            `;

            pCard.querySelector('.profile-item-left').addEventListener('click', () => {
                state.activeProfileId = p.id;
                saveState();
                renderProfilesList();
                renderApp();
            });

            pCard.querySelector('.btn-p-edit').addEventListener('click', (e) => {
                e.stopPropagation();
                loadProfileForEdit(p);
            });

            const btnDel = pCard.querySelector('.btn-p-del');
            if (btnDel) {
                btnDel.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Deseja realmente remover o perfil de ${p.name}?`)) {
                        state.profiles = state.profiles.filter(prof => prof.id !== p.id);
                        if (state.activeProfileId === p.id) {
                            state.activeProfileId = state.profiles[0].id;
                        }
                        saveState();
                        renderProfilesList();
                        renderApp();
                    }
                });
            }

            profilesListContainer.appendChild(pCard);
        });
    }

    function resetProfileForm() {
        if (profileFormTitle) profileFormTitle.textContent = 'Cadastrar Novo Perfil';
        if (profileEditIdInput) profileEditIdInput.value = '';
        if (formProfileEditor) formProfileEditor.reset();
        
        selectedAvatarEmoji = '👩‍🦰';
        updateAvatarPickerUI();

        document.getElementById('profile-age').value = 28;
        document.getElementById('profile-height').value = 168;
        document.getElementById('profile-weight').value = 75.0;
        document.getElementById('profile-weight-goal').value = 65.0;
        document.getElementById('profile-cal-exp').value = 2000;
        document.getElementById('profile-water-goal').value = 3500;
    }

    function loadProfileForEdit(p) {
        if (profileFormTitle) profileFormTitle.textContent = `Editar Perfil: ${p.name}`;
        if (profileEditIdInput) profileEditIdInput.value = p.id;
        
        document.getElementById('profile-name').value = p.name;
        document.getElementById('profile-age').value = p.age || 28;
        document.getElementById('profile-height').value = p.height || 170;
        document.getElementById('profile-weight').value = p.weight || 70;
        document.getElementById('profile-weight-goal').value = p.weightGoal || 65;
        document.getElementById('profile-cal-exp').value = p.gastoCalorico || 2000;
        document.getElementById('profile-water-goal').value = p.waterGoal || 3500;

        selectedAvatarEmoji = p.avatar || '👩‍🦰';
        updateAvatarPickerUI();

        formProfileEditor.scrollIntoView({ behavior: 'smooth' });
    }

    function updateAvatarPickerUI() {
        document.querySelectorAll('.avatar-opt').forEach(btn => {
            if (btn.getAttribute('data-emoji') === selectedAvatarEmoji) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.avatar-opt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedAvatarEmoji = e.currentTarget.getAttribute('data-emoji');
            updateAvatarPickerUI();
        });
    });

    if (btnOpenProfile) btnOpenProfile.addEventListener('click', openProfileModal);
    if (btnCloseProfile) btnCloseProfile.addEventListener('click', closeProfileModal);
    if (btnToggleNewProfile) btnToggleNewProfile.addEventListener('click', resetProfileForm);

    if (formProfileEditor) {
        formProfileEditor.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const editId = profileEditIdInput.value;
            const name = document.getElementById('profile-name').value.trim();
            const age = parseInt(document.getElementById('profile-age').value) || 28;
            const height = parseInt(document.getElementById('profile-height').value) || 170;
            const weight = parseFloat(document.getElementById('profile-weight').value) || 70.0;
            const weightGoal = parseFloat(document.getElementById('profile-weight-goal').value) || 65.0;
            const gastoCalorico = parseInt(document.getElementById('profile-cal-exp').value) || 2000;
            const waterGoal = parseInt(document.getElementById('profile-water-goal').value) || 3500;

            if (editId) {
                const p = state.profiles.find(prof => prof.id === editId);
                if (p) {
                    p.name = name;
                    p.avatar = selectedAvatarEmoji;
                    p.age = age;
                    p.height = height;
                    p.weight = weight;
                    p.weightGoal = weightGoal;
                    p.gastoCalorico = gastoCalorico;
                    p.waterGoal = waterGoal;
                }
            } else {
                const newProfile = {
                    id: 'p_' + Date.now(),
                    name,
                    avatar: selectedAvatarEmoji,
                    age,
                    height,
                    weight,
                    weightGoal,
                    gastoCalorico,
                    waterIntake: 0,
                    waterGoal,
                    exerciseMinutes: 30,
                    exerciseGoal: 60,
                    objective: 'perda_peso',
                    routines: DEFAULT_ROUTINES,
                    foods: []
                };
                state.profiles.push(newProfile);
                state.activeProfileId = newProfile.id;
            }

            saveState();
            renderProfilesList();
            renderApp();
            closeProfileModal();
        });
    }

    // -------------------------------------------------------------
    // EXERCISE REGISTRATION MODAL
    // -------------------------------------------------------------
    const cardExercise = document.getElementById('card-metric-exercise');
    const modalExercise = document.getElementById('modal-update-exercise');
    const btnCloseExerciseModal = document.getElementById('btn-close-exercise-modal');
    const formRegisterExercise = document.getElementById('form-register-exercise');

    function openExerciseModal() {
        const profile = getActiveProfile();
        const inputMins = document.getElementById('exercise-minutes');
        const inputGoal = document.getElementById('exercise-daily-goal');

        if (inputMins) inputMins.value = profile.exerciseMinutes || 45;
        if (inputGoal) inputGoal.value = profile.exerciseGoal || 60;

        if (modalExercise) modalExercise.classList.add('open');
    }

    function closeExerciseModal() {
        if (modalExercise) modalExercise.classList.remove('open');
    }

    if (cardExercise) cardExercise.addEventListener('click', openExerciseModal);
    if (btnCloseExerciseModal) btnCloseExerciseModal.addEventListener('click', closeExerciseModal);

    if (formRegisterExercise) {
        formRegisterExercise.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = getActiveProfile();
            const mins = parseInt(document.getElementById('exercise-minutes').value) || 0;
            const goal = parseInt(document.getElementById('exercise-daily-goal').value) || 60;

            profile.exerciseMinutes = mins;
            profile.exerciseGoal = goal;

            saveState();
            renderApp();
            closeExerciseModal();
        });
    }

    // -------------------------------------------------------------
    // SUGGESTIONS
    // -------------------------------------------------------------
    function renderSuggestionsView(totals, profile) {
        const consumedEl = document.getElementById('stat-consumed-kcal');
        const expEl = document.getElementById('stat-expenditure-kcal');
        const diffEl = document.getElementById('stat-diff-kcal');
        const badgeStatus = document.getElementById('badge-balance-status');

        const gasto = profile.gastoCalorico || 2000;
        const diff = totals.totalCalories - gasto;

        if (consumedEl) consumedEl.textContent = totals.totalCalories;
        if (expEl) expEl.textContent = gasto;
        if (diffEl) diffEl.textContent = `${diff > 0 ? '+' : ''}${diff}`;

        if (badgeStatus) {
            if (diff < -400) {
                badgeStatus.textContent = 'Déficit Calórico 📉';
            } else if (diff > 400) {
                badgeStatus.textContent = 'Superávit Calórico 📈';
            } else {
                badgeStatus.textContent = 'Equilíbrio Calórico ⚖️';
            }
        }

        const inputGasto = document.getElementById('input-gasto-calorico');
        const inputMeta = document.getElementById('input-peso-meta');
        if (inputGasto) inputGasto.value = gasto;
        if (inputMeta) inputMeta.value = profile.weightGoal;

        document.querySelectorAll('.goal-pill').forEach(p => {
            if (p.getAttribute('data-goal') === profile.objective) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        renderSuggestions();
    }

    function renderSuggestions() {
        if (!dadosSugestoes.dietas || !dadosSugestoes.exercicios) return;

        const profile = getActiveProfile();
        const obj = profile.objective || 'perda_peso';

        const dietas = dadosSugestoes.dietas[obj] || [];
        const exercicios = dadosSugestoes.exercicios[obj] || [];

        if (dietas.length === 0 || exercicios.length === 0) return;

        const dieta = dietas[Math.floor(Math.random() * dietas.length)];
        const exercicio = exercicios[Math.floor(Math.random() * exercicios.length)];

        const dietName = document.getElementById('sug-diet-name');
        const dietDesc = document.getElementById('sug-diet-desc');
        const exName = document.getElementById('sug-exercise-name');
        const burnBadge = document.getElementById('sug-burn-badge');
        const adviceText = document.getElementById('sug-advice-text');

        if (dietName) dietName.textContent = dieta.nome;
        if (dietDesc) dietDesc.textContent = dieta.descricao;
        if (exName) exName.textContent = exercicio.nome;
        if (burnBadge) burnBadge.textContent = `🔥 Queima ${exercicio.calorias_queimadas} kcal`;

        const totals = calculateTotals();
        const balanco = totals.totalCalories - (profile.gastoCalorico || 2000);

        if (adviceText) {
            if (obj === 'perda_peso' && balanco > 0) {
                adviceText.textContent = `Você está consumindo ${balanco} kcal a mais do que gasta. Considere praticar suas rotinas de treino para manter o déficit!`;
            } else if (obj === 'ganho_massa' && balanco < 300) {
                adviceText.textContent = `Para hipertrofia, aumente o consumo calórico e execute treinos de força progressiva.`;
            } else {
                adviceText.textContent = `Seu balanço energético está excelente. Continue com a consistência nos treinos e na dieta!`;
            }
        }
    }

    // -------------------------------------------------------------
    // NAVIGATION & VIEW SWITCHING
    // -------------------------------------------------------------
    function switchView(targetViewId) {
        document.querySelectorAll('.app-view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.add('active');
            state.currentView = targetViewId;
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('data-view') === targetViewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const container = document.getElementById('app-container');
        if (container) container.scrollTop = 0;

        renderApp();
    }

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.getAttribute('data-view');
            switchView(targetView);
        });
    });

    document.querySelectorAll('.nav-back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target') || 'view-dashboard';
            switchView(target);
        });
    });

    const btnGotoPlan = document.getElementById('btn-goto-plan');
    if (btnGotoPlan) {
        btnGotoPlan.addEventListener('click', () => {
            switchView('view-mealplan');
        });
    }

    // -------------------------------------------------------------
    // QUICK WATER BUTTONS
    // -------------------------------------------------------------
    const btnQuickWater = document.getElementById('btn-quick-water');
    const btnAddCupAct = document.getElementById('btn-add-cup-act');

    function addWaterGlass() {
        const profile = getActiveProfile();
        profile.waterIntake = (profile.waterIntake || 0) + 250;
        saveState();
        renderApp();
    }

    if (btnQuickWater) btnQuickWater.addEventListener('click', (e) => {
        e.stopPropagation();
        addWaterGlass();
    });
    if (btnAddCupAct) btnAddCupAct.addEventListener('click', addWaterGlass);

    // Goal Pills Selection
    document.querySelectorAll('.goal-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            const profile = getActiveProfile();
            document.querySelectorAll('.goal-pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            profile.objective = e.currentTarget.getAttribute('data-goal');
            saveState();
            renderSuggestions();
        });
    });

    // Goals Form Submit
    const formGoals = document.getElementById('form-goals');
    if (formGoals) {
        formGoals.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = getActiveProfile();
            const gasto = parseInt(document.getElementById('input-gasto-calorico').value);
            const pesoMeta = parseFloat(document.getElementById('input-peso-meta').value);

            if (!isNaN(gasto)) profile.gastoCalorico = gasto;
            if (!isNaN(pesoMeta)) profile.weightGoal = pesoMeta;

            saveState();
            renderApp();
            alert('Metas salvas com sucesso!');
        });
    }

    const btnRefreshSug = document.getElementById('btn-refresh-suggestion');
    if (btnRefreshSug) {
        btnRefreshSug.addEventListener('click', renderSuggestions);
    }

    // -------------------------------------------------------------
    // MODAL: ADD FOOD TO SLOT
    // -------------------------------------------------------------
    const modalAddFood = document.getElementById('modal-add-food');
    const modalSlotTitle = document.getElementById('modal-slot-title');
    const modalQuickFoods = document.getElementById('modal-quick-foods');
    const inputSearchFoods = document.getElementById('input-search-foods');

    function openAddFoodModal(slot) {
        state.selectedSlotForAdd = slot;
        const slotTitles = {
            breakfast: 'Adicionar ao Café da Manhã',
            lunch: 'Adicionar ao Almoço',
            dinner: 'Adicionar ao Jantar'
        };
        if (modalSlotTitle) modalSlotTitle.textContent = slotTitles[slot] || 'Adicionar Alimento';

        renderQuickFoodsList('');
        if (modalAddFood) modalAddFood.classList.add('open');
    }

    function closeAddFoodModal() {
        if (modalAddFood) modalAddFood.classList.remove('open');
    }

    function renderQuickFoodsList(query) {
        if (!modalQuickFoods) return;
        modalQuickFoods.innerHTML = '';

        const profile = getActiveProfile();
        const q = (query || '').toLowerCase();
        const filtered = DEFAULT_FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(q));

        filtered.forEach(food => {
            const item = document.createElement('div');
            item.className = 'quick-food-item';
            item.innerHTML = `
                <div class="qf-info">
                    <span class="qf-name">${food.name}</span>
                    <span class="qf-macros">P: ${food.protein}g • C: ${food.carbs}g • G: ${food.fat}g</span>
                </div>
                <span class="qf-cal">🔥 ${food.calories} kcal</span>
            `;

            item.addEventListener('click', () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                if (!profile.foods) profile.foods = [];
                profile.foods.push({
                    id: 'f_' + Date.now(),
                    name: food.name,
                    calories: food.calories,
                    protein: food.protein,
                    carbs: food.carbs,
                    fat: food.fat,
                    slot: state.selectedSlotForAdd,
                    qty: 1,
                    time: timeString
                });

                saveState();
                closeAddFoodModal();
                renderApp();
            });

            modalQuickFoods.appendChild(item);
        });
    }

    if (inputSearchFoods) {
        inputSearchFoods.addEventListener('input', (e) => {
            renderQuickFoodsList(e.target.value);
        });
    }

    document.querySelectorAll('.btn-slot-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slot = e.currentTarget.getAttribute('data-slot');
            openAddFoodModal(slot);
        });
    });

    const btnCloseFoodModal = document.getElementById('btn-close-food-modal');
    if (btnCloseFoodModal) btnCloseFoodModal.addEventListener('click', closeAddFoodModal);

    // -------------------------------------------------------------
    // MODAL: CREATE CUSTOM FOOD
    // -------------------------------------------------------------
    const modalCreateFood = document.getElementById('modal-create-food');
    const btnOpenCreateFood = document.getElementById('btn-open-create-food');
    const btnModalToCreate = document.getElementById('btn-modal-to-create');
    const btnCloseCreateModal = document.getElementById('btn-close-create-modal');
    const formCreateAlimento = document.getElementById('form-create-alimento');

    function openCreateModal(defaultSlot) {
        closeAddFoodModal();
        if (defaultSlot) {
            const selectTarget = document.getElementById('food-meal-target');
            if (selectTarget) selectTarget.value = defaultSlot;
        }
        if (modalCreateFood) modalCreateFood.classList.add('open');
    }

    function closeCreateModal() {
        if (modalCreateFood) modalCreateFood.classList.remove('open');
    }

    if (btnOpenCreateFood) btnOpenCreateFood.addEventListener('click', () => openCreateModal(state.selectedSlotForAdd));
    if (btnModalToCreate) btnModalToCreate.addEventListener('click', () => openCreateModal(state.selectedSlotForAdd));
    if (btnCloseCreateModal) btnCloseCreateModal.addEventListener('click', closeCreateModal);

    if (formCreateAlimento) {
        formCreateAlimento.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = getActiveProfile();

            const name = document.getElementById('food-name').value;
            const calories = parseInt(document.getElementById('food-cal').value);
            const protein = parseFloat(document.getElementById('food-prot').value);
            const carbs = parseFloat(document.getElementById('food-carbs').value);
            const fat = parseFloat(document.getElementById('food-fat').value);
            const slot = document.getElementById('food-meal-target').value;

            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newFood = {
                id: 'cust_' + Date.now(),
                name,
                calories,
                protein,
                carbs,
                fat,
                slot,
                qty: 1,
                time: timeString
            };

            if (!profile.foods) profile.foods = [];
            profile.foods.push(newFood);
            DEFAULT_FOOD_DATABASE.unshift({ ...newFood });

            saveState();
            formCreateAlimento.reset();
            closeCreateModal();
            renderApp();
        });
    }

    // -------------------------------------------------------------
    // MODAL: UPDATE WEIGHT
    // -------------------------------------------------------------
    const modalMetric = document.getElementById('modal-update-metric');
    const modalMetricTitle = document.getElementById('modal-metric-title');
    const labelMetricInput = document.getElementById('label-metric-input');
    const inputMetricVal = document.getElementById('input-metric-val');
    const btnCloseMetricModal = document.getElementById('btn-close-metric-modal');
    const formUpdateMetric = document.getElementById('form-update-metric');

    function openWeightModal() {
        const profile = getActiveProfile();
        if (modalMetricTitle) modalMetricTitle.textContent = 'Atualizar Peso (kg)';
        if (labelMetricInput) labelMetricInput.textContent = 'Peso Atual (kg):';
        if (inputMetricVal) {
            inputMetricVal.value = profile.weight;
            inputMetricVal.step = '0.1';
        }
        if (modalMetric) modalMetric.classList.add('open');
    }

    function closeMetricModal() {
        if (modalMetric) modalMetric.classList.remove('open');
    }

    const cardWeight = document.getElementById('card-metric-weight');
    if (cardWeight) cardWeight.addEventListener('click', openWeightModal);
    if (btnCloseMetricModal) btnCloseMetricModal.addEventListener('click', closeMetricModal);

    if (formUpdateMetric) {
        formUpdateMetric.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = getActiveProfile();
            const val = parseFloat(inputMetricVal.value);
            if (!isNaN(val)) {
                profile.weight = val;
                saveState();
                renderApp();
            }
            closeMetricModal();
        });
    }

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('open');
            }
        });
    });

    // -------------------------------------------------------------
    // HYDRATION ALARM & WATER REMINDERS ENGINE (NOVA FUNCIONALIDADE)
    // -------------------------------------------------------------
    const btnQuickNotify = document.getElementById('btn-quick-notify');
    const modalHydrationAlarm = document.getElementById('modal-hydration-alarm');
    const btnCloseAlarmModal = document.getElementById('btn-close-alarm-modal');
    const formHydrationAlarm = document.getElementById('form-hydration-alarm');
    const toggleAlarmEnabled = document.getElementById('toggle-alarm-enabled');
    const inputAlarmInterval = document.getElementById('input-alarm-interval');
    const inputAlarmVolume = document.getElementById('input-alarm-volume');
    const alarmStartTimeInput = document.getElementById('alarm-start-time');
    const alarmEndTimeInput = document.getElementById('alarm-end-time');
    const alarmCountdownClock = document.getElementById('alarm-countdown-clock');
    const alarmStatusIndicator = document.getElementById('alarm-status-indicator');
    const alarmStatusText = document.getElementById('alarm-status-text');
    const alarmQuickVol = document.getElementById('alarm-quick-vol');
    const btnQuickDrinkAlarm = document.getElementById('btn-quick-drink-alarm');
    const btnTestAlarmSound = document.getElementById('btn-test-alarm-sound');

    // Toast Banner Elements
    const toastBanner = document.getElementById('hydration-toast-banner');
    const toastWaterVol = document.getElementById('toast-water-vol');
    const btnToastDrink = document.getElementById('btn-toast-drink');
    const btnToastDismiss = document.getElementById('btn-toast-dismiss');

    // Water Drop Synthesizer via Web Audio API
    function playWaterChime() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const now = ctx.currentTime;
            
            // Primary pure water droplet oscillator
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, now); // D5
            osc1.frequency.exponentialRampToValueAtTime(880, now + 0.07); // A5
            osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.14); // D6
            
            gain1.gain.setValueAtTime(0, now);
            gain1.gain.linearRampToValueAtTime(0.4, now + 0.02);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
            
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.45);

            // Resonant second harmonic chime
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(880, now + 0.1);
            osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.22); // E6
            
            gain2.gain.setValueAtTime(0, now + 0.1);
            gain2.gain.linearRampToValueAtTime(0.3, now + 0.14);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
            
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(now + 0.1);
            osc2.stop(now + 0.6);
        } catch (e) {
            console.log('Web Audio tone played:', e);
        }
    }

    // Trigger Toast & Notification
    function triggerHydrationAlert() {
        const profile = getActiveProfile();
        const vol = profile.hydrationVolumeMl || 250;
        
        if (toastWaterVol) toastWaterVol.textContent = vol;
        if (btnToastDrink) btnToastDrink.textContent = `💧 Bebi (+${vol}ml)`;
        
        if (toastBanner) {
            toastBanner.classList.add('show');
            setTimeout(() => {
                if (toastBanner.classList.contains('show')) {
                    toastBanner.classList.remove('show');
                }
            }, 14000);
        }
        
        playWaterChime();
        
        // System Push Notification if supported and allowed
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                try {
                    new Notification('💧 HealthControl: Hora de Beber Água!', {
                        body: `Beba ${vol}ml de água para atingir sua meta diária de ${((profile.waterGoal || 3500)/1000).toFixed(1)}L!`,
                        icon: '💧'
                    });
                } catch (err) {}
            } else if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }

    function isCurrentTimeInWindow(startTime, endTime) {
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();

        const [sH, sM] = (startTime || '08:00').split(':').map(Number);
        const [eH, eM] = (endTime || '22:00').split(':').map(Number);

        const startMins = sH * 60 + sM;
        const endMins = eH * 60 + eM;

        if (startMins <= endMins) {
            return currentMins >= startMins && currentMins <= endMins;
        } else {
            // Over midnight window
            return currentMins >= startMins || currentMins <= endMins;
        }
    }

    function resetHydrationCountdown() {
        const profile = getActiveProfile();
        const intervalMins = profile.hydrationIntervalMins || 60;
        state.nextHydrationTargetTime = Date.now() + intervalMins * 60 * 1000;
        updateAlarmModalUI();
    }

    function updateAlarmModalUI() {
        const profile = getActiveProfile();
        const isEnabled = profile.hydrationAlarmEnabled;
        const inWindow = isCurrentTimeInWindow(profile.hydrationStartTime, profile.hydrationEndTime);

        if (toggleAlarmEnabled) toggleAlarmEnabled.checked = isEnabled;
        if (inputAlarmInterval) inputAlarmInterval.value = profile.hydrationIntervalMins || 60;
        if (inputAlarmVolume) inputAlarmVolume.value = profile.hydrationVolumeMl || 250;
        if (alarmStartTimeInput) alarmStartTimeInput.value = profile.hydrationStartTime || '08:00';
        if (alarmEndTimeInput) alarmEndTimeInput.value = profile.hydrationEndTime || '22:00';
        if (alarmQuickVol) alarmQuickVol.textContent = profile.hydrationVolumeMl || 250;

        // Interval chips
        document.querySelectorAll('.interval-chip').forEach(chip => {
            const mins = parseInt(chip.getAttribute('data-mins'));
            if (mins === profile.hydrationIntervalMins) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        // Volume chips
        document.querySelectorAll('.volume-chip').forEach(chip => {
            const vol = parseInt(chip.getAttribute('data-vol'));
            if (vol === profile.hydrationVolumeMl) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        // Status Indicator
        if (alarmStatusIndicator && alarmStatusText) {
            if (!isEnabled) {
                alarmStatusIndicator.className = 'alarm-status-pill';
                alarmStatusText.textContent = 'Alarme Desativado';
            } else if (!inWindow) {
                alarmStatusIndicator.className = 'alarm-status-pill';
                alarmStatusText.textContent = `Pausado (Fora do Horário: ${profile.hydrationStartTime} - ${profile.hydrationEndTime})`;
            } else {
                alarmStatusIndicator.className = 'alarm-status-pill active';
                alarmStatusText.textContent = 'Lembrete Ativo';
            }
        }
    }

    // Tick loop every 1 second
    setInterval(() => {
        const profile = getActiveProfile();
        if (!profile.hydrationAlarmEnabled) {
            if (alarmCountdownClock) alarmCountdownClock.textContent = '--:--:--';
            return;
        }

        const inWindow = isCurrentTimeInWindow(profile.hydrationStartTime, profile.hydrationEndTime);
        const diffMs = state.nextHydrationTargetTime - Date.now();

        if (diffMs <= 0) {
            if (inWindow) {
                triggerHydrationAlert();
            }
            resetHydrationCountdown();
        } else {
            const totalSecs = Math.floor(diffMs / 1000);
            const hrs = Math.floor(totalSecs / 3600);
            const mins = Math.floor((totalSecs % 3600) / 60);
            const secs = totalSecs % 60;

            if (alarmCountdownClock) {
                alarmCountdownClock.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }
        }
    }, 1000);

    function openHydrationAlarmModal() {
        updateAlarmModalUI();
        if (modalHydrationAlarm) modalHydrationAlarm.classList.add('open');
    }

    function closeHydrationAlarmModal() {
        if (modalHydrationAlarm) modalHydrationAlarm.classList.remove('open');
    }

    if (btnQuickNotify) btnQuickNotify.addEventListener('click', openHydrationAlarmModal);
    if (btnCloseAlarmModal) btnCloseAlarmModal.addEventListener('click', closeHydrationAlarmModal);

    // Interval Chip click
    document.querySelectorAll('.interval-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.interval-chip').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const mins = parseInt(e.currentTarget.getAttribute('data-mins'));
            if (inputAlarmInterval) inputAlarmInterval.value = mins;
        });
    });

    // Volume Chip click
    document.querySelectorAll('.volume-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.volume-chip').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const vol = parseInt(e.currentTarget.getAttribute('data-vol'));
            if (inputAlarmVolume) inputAlarmVolume.value = vol;
            if (alarmQuickVol) alarmQuickVol.textContent = vol;
        });
    });

    // Toggle switch on change
    if (toggleAlarmEnabled) {
        toggleAlarmEnabled.addEventListener('change', (e) => {
            const profile = getActiveProfile();
            profile.hydrationAlarmEnabled = e.target.checked;
            saveState();
            renderApp();
            updateAlarmModalUI();
        });
    }

    // Quick Drink now button inside modal
    function drinkWaterFromAlarm() {
        const profile = getActiveProfile();
        const vol = profile.hydrationVolumeMl || 250;
        profile.waterIntake = (profile.waterIntake || 0) + vol;
        
        saveState();
        renderApp();
        resetHydrationCountdown();
        
        if (toastBanner) toastBanner.classList.remove('show');
        playWaterChime();
        
        alert(`💧 Excelente! +${vol}ml de água registrados!\nTotal de hoje: ${profile.waterIntake}ml de ${profile.waterGoal}ml.`);
    }

    if (btnQuickDrinkAlarm) btnQuickDrinkAlarm.addEventListener('click', drinkWaterFromAlarm);
    if (btnToastDrink) btnToastDrink.addEventListener('click', drinkWaterFromAlarm);
    if (btnToastDismiss) btnToastDismiss.addEventListener('click', () => {
        if (toastBanner) toastBanner.classList.remove('show');
    });

    // Test Sound & Toast Button
    if (btnTestAlarmSound) {
        btnTestAlarmSound.addEventListener('click', () => {
            triggerHydrationAlert();
        });
    }

    // Form Save Preferences Submit
    if (formHydrationAlarm) {
        formHydrationAlarm.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = getActiveProfile();

            profile.hydrationAlarmEnabled = toggleAlarmEnabled.checked;
            profile.hydrationIntervalMins = parseInt(inputAlarmInterval.value) || 60;
            profile.hydrationVolumeMl = parseInt(inputAlarmVolume.value) || 250;
            profile.hydrationStartTime = alarmStartTimeInput.value || '08:00';
            profile.hydrationEndTime = alarmEndTimeInput.value || '22:00';

            saveState();
            renderApp();
            resetHydrationCountdown();
            closeHydrationAlarmModal();

            alert('💧 Preferências do Alarme de Hidratação salvas com sucesso!');
        });
    }

    // -------------------------------------------------------------
    // INITIAL BOOTSTRAP & PWA REGISTRATION
    // -------------------------------------------------------------
    resetHydrationCountdown();
    renderApp();

    // Register Service Worker for PWA (Installable Mobile App)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('PWA ServiceWorker registrado com sucesso:', reg.scope))
                .catch(err => console.log('Falha ao registrar ServiceWorker:', err));
        });
    }
});
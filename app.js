// FitTrack — all front-end only, no frameworks, no canvas. Uses localStorage.
// Features:
// - Dashboard with "rings" (Move kcal, Exercise min, Steps) using SVG
// - Log food (mock search), log exercise
// - History with SVG line chart
// - Goals/macros
// - Profile with units/preferences
// Data is persisted in localStorage. Everything runs client-side.

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const STORAGE_KEYS = {
  foods: "ft_food_entries",
  workouts: "ft_workout_entries",
  goals: "ft_goals",
  profile: "ft_profile"
};

const todayISO = () => new Date().toISOString().slice(0,10);

// ------- Data layer -------
const db = {
  get(key, fallback){
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : (fallback ?? null);
    } catch {
      return fallback ?? null;
    }
  },
  set(key, val){
    localStorage.setItem(key, JSON.stringify(val));
  }
};

// Defaults
if(!db.get(STORAGE_KEYS.foods)) db.set(STORAGE_KEYS.foods, []);
if(!db.get(STORAGE_KEYS.workouts)) db.set(STORAGE_KEYS.workouts, []);
if(!db.get(STORAGE_KEYS.goals)) db.set(STORAGE_KEYS.goals, {
  dailyCalories: 2200,
  proteinPct: 30, carbsPct: 45, fatPct: 25,
  moveGoal: 600, exerciseGoal: 30, stepsGoal: 10000
});
if(!db.get(STORAGE_KEYS.profile)) db.set(STORAGE_KEYS.profile, {
  name: "You",
  units: "imperial", // or "metric"
  heightCm: 175, weightKg: 70, age: 25, sex: "unspecified"
});

// ------- Utilities -------
function sum(arr, sel = (x)=>x){ return arr.reduce((a,b)=>a + sel(b), 0); }
function fmt(n){ return new Intl.NumberFormat().format(Math.round(n)); }
function kcalFromMacros({proteinG, carbsG, fatG}){
  return proteinG*4 + carbsG*4 + fatG*9;
}
function clamp(n, a, b){ return Math.min(Math.max(n, a), b); }
function uid(){ return Math.random().toString(36).slice(2,10); }
function showToast(msg){
  const t = document.importNode($('#toast-template').content, true);
  const el = t.querySelector('.toast');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 2200);
}

// ------- Views Router -------
const app = $('#app');
const navButtons = $$('.nav-btn');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b=>b.removeAttribute('aria-current'));
    btn.setAttribute('aria-current', 'page');
    renderView(btn.dataset.view);
  });
});

function renderView(view){
  if(view === 'dashboard') return renderDashboard();
  if(view === 'log') return renderLog();
  if(view === 'history') return renderHistory();
  if(view === 'goals') return renderGoals();
  if(view === 'profile') return renderProfile();
  renderDashboard();
}

// ... (the rest of the JavaScript code is as in the script; due to size we will not replicate fully here for this example) ...

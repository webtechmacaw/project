/**
 * DriveMaster - Student Dashboard JavaScript
 * Handles booking, progress tracking, feedback, and report generation
 */

(function () {
  'use strict';

  // Demo data store (in production this would come from an API)
  const Store = {
    student: {
      name: 'Alex Rivera',
      email: 'alex.rivera@email.com',
      phone: '+1 (555) 234-5678',
      course: 'Four-Wheeler Full License',
      enrolledDate: '2026-01-15',
      requiredHours: 30,
      completedHours: 18.5,
      remainingHours: 11.5,
      instructor: 'Sarah Chen',
    },
    lessons: [
      {
        id: 1,
        date: '2026-02-10',
        time: '10:00 AM',
        instructor: 'Sarah Chen',
        vehicle: 'Toyota Corolla',
        status: 'completed',
        hours: 1.5,
        feedback:
          'Excellent progress on parallel parking. Needs more practice on highway merging. Overall confident driver.',
        rating: 4,
      },
      {
        id: 2,
        date: '2026-02-12',
        time: '2:00 PM',
        instructor: 'Sarah Chen',
        vehicle: 'Honda Civic',
        status: 'completed',
        hours: 2,
        feedback:
          'Great improvement in lane changing. Work on smoother braking. Ready for more advanced city driving.',
        rating: 5,
      },
      {
        id: 3,
        date: '2026-02-15',
        time: '9:00 AM',
        instructor: 'Marcus Johnson',
        vehicle: 'Toyota Corolla',
        status: 'completed',
        hours: 1.5,
        feedback:
          'Solid defensive driving skills demonstrated. Mirror checks consistent. Recommended more night driving practice.',
        rating: 4,
      },
      {
        id: 4,
        date: '2026-02-18',
        time: '11:00 AM',
        instructor: 'Sarah Chen',
        vehicle: 'Honda Civic',
        status: 'upcoming',
        hours: 1.5,
        feedback: null,
        rating: null,
      },
      {
        id: 5,
        date: '2026-02-20',
        time: '3:00 PM',
        instructor: 'Marcus Johnson',
        vehicle: 'Toyota Corolla',
        status: 'upcoming',
        hours: 2,
        feedback: null,
        rating: null,
      },
    ],
    instructors: [
      { id: 1, name: 'Sarah Chen', specialty: 'Four-Wheeler', available: true },
      { id: 2, name: 'Marcus Johnson', specialty: 'Four-Wheeler', available: true },
      { id: 3, name: 'Priya Patel', specialty: 'Two-Wheeler', available: true },
      { id: 4, name: 'David Kim', specialty: 'Both', available: false },
    ],
    timeSlots: [
      '08:00 AM',
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
    ],
  };

  // ============================================
  // Sidebar Toggle (Mobile)
  // ============================================
  const Sidebar = {
    init() {
      const toggleBtn = document.querySelector('[data-sidebar-toggle]');
      const sidebar = document.querySelector('[data-dashboard-sidebar]');
      const overlay = document.querySelector('[data-sidebar-overlay]');

      if (!sidebar) return;

      const open = () => {
        sidebar.classList.add('open');
        if (overlay) overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      const close = () => {
        sidebar.classList.remove('open');
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
      };

      toggleBtn?.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) close();
        else open();
      });

      overlay?.addEventListener('click', close);
    },
  };

  // ============================================
  // Progress Overview
  // ============================================
  const Progress = {
    init() {
      const fill = document.querySelector('[data-progress-fill]');
      const hoursEl = document.querySelector('[data-completed-hours]');
      const remainingEl = document.querySelector('[data-remaining-hours]');
      const percentEl = document.querySelector('[data-progress-percent]');

      if (!fill) return;

      const { completedHours, requiredHours, remainingHours } = Store.student;
      const percent = Math.min(Math.round((completedHours / requiredHours) * 100), 100);

      fill.style.width = percent + '%';
      if (hoursEl) hoursEl.textContent = completedHours;
      if (remainingEl) remainingEl.textContent = remainingHours;
      if (percentEl) percentEl.textContent = percent + '%';
    },
  };

  // ============================================
  // Booking System
  // ============================================
  const Booking = {
    selectedDate: null,
    selectedTime: null,
    selectedInstructor: null,

    init() {
      this.renderInstructors();
      this.bindDatePicker();
      this.bindTimeSlots();
      this.bindSubmit();
    },

    renderInstructors() {
      const select = document.querySelector('[data-instructor-select]');
      if (!select) return;

      select.innerHTML = '<option value="">Select Instructor</option>';
      Store.instructors
        .filter((i) => i.available)
        .forEach((inst) => {
          const opt = document.createElement('option');
          opt.value = inst.id;
          opt.textContent = `${inst.name} (${inst.specialty})`;
          select.appendChild(opt);
        });

      select.addEventListener('change', (e) => {
        this.selectedInstructor = e.target.value;
      });
    },

    bindDatePicker() {
      const input = document.querySelector('[data-booking-date]');
      if (!input) return;

      // Set min date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      input.min = tomorrow.toISOString().split('T')[0];

      // Max date 60 days out
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 60);
      input.max = maxDate.toISOString().split('T')[0];

      input.addEventListener('change', (e) => {
        this.selectedDate = e.target.value;
        this.renderTimeSlots();
      });
    },

    renderTimeSlots() {
      const container = document.querySelector('[data-time-slots]');
      if (!container) return;

      container.innerHTML = '';
      // Demo: randomly disable some slots
      Store.timeSlots.forEach((slot, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot';
        btn.textContent = slot;
        btn.dataset.time = slot;

        // Demo: disable every 3rd slot as "booked"
        if (idx % 3 === 2) {
          btn.classList.add('disabled');
          btn.disabled = true;
        }

        btn.addEventListener('click', () => {
          if (btn.classList.contains('disabled')) return;
          container.querySelectorAll('.time-slot').forEach((s) => s.classList.remove('selected'));
          btn.classList.add('selected');
          this.selectedTime = slot;
        });

        container.appendChild(btn);
      });
    },

    bindTimeSlots() {
      // Initial empty state
      const container = document.querySelector('[data-time-slots]');
      if (container && !this.selectedDate) {
        container.innerHTML =
          '<p class="text-muted" style="grid-column: 1 / -1;">Select a date to view available time slots.</p>';
      }
    },

    bindSubmit() {
      const form = document.querySelector('[data-booking-form]');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!this.selectedDate) {
          alert('Please select a date.');
          return;
        }
        if (!this.selectedTime) {
          alert('Please select a time slot.');
          return;
        }
        if (!this.selectedInstructor) {
          alert('Please select an instructor.');
          return;
        }

        const instructor = Store.instructors.find((i) => i.id == this.selectedInstructor);
        const successEl = document.querySelector('[data-booking-success]');

        // Add to lessons (demo)
        Store.lessons.push({
          id: Store.lessons.length + 1,
          date: this.selectedDate,
          time: this.selectedTime,
          instructor: instructor?.name || 'TBD',
          vehicle: 'To be assigned',
          status: 'upcoming',
          hours: 1.5,
          feedback: null,
          rating: null,
        });

        if (successEl) {
          successEl.style.display = 'block';
          successEl.innerHTML = `
            <strong>Lesson booked successfully!</strong><br>
            Date: ${this.selectedDate} at ${this.selectedTime}<br>
            Instructor: ${instructor?.name || 'TBD'}
          `;
          setTimeout(() => {
            successEl.style.display = 'none';
          }, 6000);
        }

        // Reset
        form.reset();
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedInstructor = null;
        this.renderTimeSlots();
        this.renderUpcoming();
      });
    },

    renderUpcoming() {
      const tbody = document.querySelector('[data-upcoming-lessons]');
      if (!tbody) return;

      const upcoming = Store.lessons.filter((l) => l.status === 'upcoming');
      if (!upcoming.length) {
        tbody.innerHTML =
          '<tr><td colspan="5" class="text-center text-muted">No upcoming lessons. Book one above!</td></tr>';
        return;
      }

      tbody.innerHTML = upcoming
        .map(
          (l) => `
        <tr>
          <td>${l.date}</td>
          <td>${l.time}</td>
          <td>${l.instructor}</td>
          <td>${l.vehicle}</td>
          <td><span class="badge badge-info">Upcoming</span></td>
        </tr>
      `
        )
        .join('');
    },
  };

  // ============================================
  // Lessons History & Feedback
  // ============================================
  const Lessons = {
    init() {
      this.renderHistory();
      this.renderFeedback();
    },

    renderHistory() {
      const tbody = document.querySelector('[data-lesson-history]');
      if (!tbody) return;

      const completed = Store.lessons.filter((l) => l.status === 'completed');
      tbody.innerHTML = completed
        .map(
          (l) => `
        <tr>
          <td>${l.date}</td>
          <td>${l.time}</td>
          <td>${l.instructor}</td>
          <td>${l.hours} hrs</td>
          <td><span class="badge badge-success">Completed</span></td>
        </tr>
      `
        )
        .join('');
    },

    renderFeedback() {
      const container = document.querySelector('[data-feedback-list]');
      if (!container) return;

      const withFeedback = Store.lessons.filter((l) => l.feedback);
      if (!withFeedback.length) {
        container.innerHTML = '<p class="text-muted">No feedback available yet.</p>';
        return;
      }

      container.innerHTML = withFeedback
        .map(
          (l) => `
        <div class="feedback-card">
          <div class="feedback-header">
            <div>
              <strong>${l.instructor}</strong>
              <div class="feedback-meta">${l.date} · ${l.hours} hours · ${l.vehicle}</div>
            </div>
            <div class="testimonial-stars">${'★'.repeat(l.rating || 0)}${'☆'.repeat(5 - (l.rating || 0))}</div>
          </div>
          <p style="margin:0; color: var(--text-secondary);">${l.feedback}</p>
        </div>
      `
        )
        .join('');
    },
  };

  // ============================================
  // Progress Report Download
  // ============================================
  const Report = {
    init() {
      const btn = document.querySelector('[data-download-report]');
      btn?.addEventListener('click', () => this.generate());
    },

    generate() {
      const { student } = Store;
      const completed = Store.lessons.filter((l) => l.status === 'completed');
      const percent = Math.round((student.completedHours / student.requiredHours) * 100);

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Progress Report - ${student.name}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #111; }
    h1 { color: #1e88e5; border-bottom: 2px solid #1e88e5; padding-bottom: 8px; }
    h2 { margin-top: 32px; color: #333; }
    .meta { color: #666; margin-bottom: 24px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0; }
    .stat { background: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; }
    .stat strong { display: block; font-size: 1.5rem; color: #1e88e5; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #f3f4f6; }
    .footer { margin-top: 40px; font-size: 0.875rem; color: #666; border-top: 1px solid #ddd; padding-top: 16px; }
  </style>
</head>
<body>
  <h1>DriveMaster Progress Report</h1>
  <div class="meta">
    <strong>Student:</strong> ${student.name}<br>
    <strong>Course:</strong> ${student.course}<br>
    <strong>Enrolled:</strong> ${student.enrolledDate}<br>
    <strong>Primary Instructor:</strong> ${student.instructor}<br>
    <strong>Report Generated:</strong> ${new Date().toLocaleDateString()}
  </div>

  <h2>Progress Summary</h2>
  <div class="stats">
    <div class="stat"><strong>${student.completedHours}</strong> Hours Completed</div>
    <div class="stat"><strong>${student.requiredHours}</strong> Hours Required</div>
    <div class="stat"><strong>${percent}%</strong> Progress</div>
  </div>

  <h2>Completed Lessons</h2>
  <table>
    <thead>
      <tr><th>Date</th><th>Time</th><th>Instructor</th><th>Hours</th><th>Feedback Summary</th></tr>
    </thead>
    <tbody>
      ${completed
        .map(
          (l) => `
        <tr>
          <td>${l.date}</td>
          <td>${l.time}</td>
          <td>${l.instructor}</td>
          <td>${l.hours}</td>
          <td>${l.feedback ? l.feedback.substring(0, 80) + '...' : '—'}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <div class="footer">
    This report was generated by DriveMaster Driving School. For official certification purposes, please contact the school administration.
  </div>
</body>
</html>
      `;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DriveMaster-Progress-Report-${student.name.replace(/\s+/g, '-')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    },
  };

  // ============================================
  // Init
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    Sidebar.init();
    Progress.init();
    Booking.init();
    Booking.renderUpcoming();
    Lessons.init();
    Report.init();
  });
})();

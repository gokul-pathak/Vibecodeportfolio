# Portfolio Role-Based Configuration

## Overview
The portfolio features a personalized experience based on the visitor's role. Users select their role on the initial screen and see customized content relevant to their interests.

## Available Roles

### 🎯 Hiring Manager
**Focus**: Professional credentials, availability, and hiring information

**Visible Sections**:
- ✅ Hiring Banner (with resume download & schedule call)
- ✅ Hero Section
- ✅ Role-Based Welcome Message
- ✅ Availability Status
- ✅ Company Slider
- ✅ About Section
- ✅ Quick Stats (metrics & achievements)
- ✅ Interactive Skills
- ✅ Projects Showcase
- ✅ Interactive Timeline (career history)
- ✅ Why Hire Me Section
- ✅ Testimonials
- ✅ Contact Section
- ✅ AI Chatbot
- ✅ Easter Eggs
- ❌ Blog Section (hidden)
- ❌ Visitor Actions (hidden)

---

### 💻 Developer
**Focus**: Technical expertise, code quality, and development skills

**Visible Sections**:
- ✅ Hero Section
- ✅ Role-Based Welcome Message
- ✅ Availability Status
- ✅ Company Slider
- ✅ About Section
- ✅ Quick Stats
- ✅ Interactive Skills (technical focus)
- ✅ Projects Showcase (technical deep dive)
- ✅ Interactive Timeline
- ✅ Blog Section (technical articles)
- ✅ Testimonials
- ✅ Visitor Actions (share & subscribe)
- ✅ Contact Section
- ✅ AI Chatbot
- ✅ Easter Eggs
- ❌ Hiring Banner (hidden)
- ❌ Why Hire Me Section (hidden)

---

### 🎨 Designer
**Focus**: Design portfolio, creative process, and visual work

**Visible Sections**:
- ✅ Hero Section
- ✅ Role-Based Welcome Message
- ✅ Availability Status
- ✅ Company Slider
- ✅ About Section
- ✅ Interactive Skills (design focus)
- ✅ Projects Showcase (design emphasis)
- ✅ Blog Section (design insights)
- ✅ Testimonials
- ✅ Visitor Actions
- ✅ Contact Section
- ✅ AI Chatbot
- ✅ Easter Eggs
- ❌ Hiring Banner (hidden)
- ❌ Quick Stats (hidden)
- ❌ Interactive Timeline (hidden)
- ❌ Why Hire Me Section (hidden)

---

### 👤 Visitor (General)
**Focus**: Overall portfolio browse and general information

**Visible Sections**:
- ✅ Hero Section
- ✅ Role-Based Welcome Message
- ✅ Company Slider
- ✅ About Section
- ✅ Interactive Skills
- ✅ Projects Showcase
- ✅ Blog Section
- ✅ Testimonials
- ✅ Visitor Actions (share, subscribe, resources)
- ✅ Contact Section
- ✅ AI Chatbot
- ✅ Easter Eggs
- ❌ Hiring Banner (hidden)
- ❌ Availability Status (hidden)
- ❌ Quick Stats (hidden)
- ❌ Interactive Timeline (hidden)
- ❌ Why Hire Me Section (hidden)

---

## Common Features (All Roles)

These features are available regardless of role:
- 🎨 Particle Field Background
- 🖱️ Custom Cursor
- 📊 Scroll Progress Indicator
- 🧭 Navigation
- 🎭 Role Indicator (with switch button)
- 🤖 AI Chatbot
- 🎯 Easter Eggs
- 🎨 Hero Section
- 📧 Contact Section
- 🎬 Floating Actions

## Role Switching

Users can switch their role at any time by clicking the refresh icon in the Role Indicator badge (top-right corner). This will return them to the role selection screen.

## Implementation Details

The role-based routing is managed in `/App.tsx` with a simple configuration object that controls section visibility. The role state is managed with React's `useState` hook and persists throughout the session.

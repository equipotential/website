const inquiryForm = document.getElementById('inquiry-form');
const inquiryType = document.getElementById('inquiry-type');
const interest = document.getElementById('interest');
const message = document.getElementById('message');

const inquiryPrompts = {
  engineering: {
    help: 'Tell us about a workflow, product question, or engineering challenge.',
    company: 'Company / organization',
    companyPlaceholder: 'Your company or organization',
    label: 'What would you like to improve?',
    messageHelp: 'Share your current workflow, the challenge, and what a better outcome would look like.',
    placeholder: 'Tell us a little about your engineering challenge…',
  },
  partnership: {
    help: 'Explore collaboration, technology integration, or a shared engineering opportunity.',
    company: 'Company / organization',
    companyPlaceholder: 'Your company or organization',
    label: 'How would you like to collaborate?',
    messageHelp: 'Introduce your organization, describe the opportunity, and tell us where our work could connect.',
    placeholder: 'Tell us about the partnership you have in mind…',
  },
  investor: {
    help: 'Introduce yourself and your interest in Equipotential Lab’s direction.',
    company: 'Firm / affiliation',
    companyPlaceholder: 'Your firm, affiliation, or independent investor',
    label: 'Tell us about your interest.',
    messageHelp: 'Share a short introduction, your investment focus, and what interests you about AI-accelerated engineering.',
    placeholder: 'Introduce yourself and what you’d like to discuss…',
  },
};

function updateInquiryFields() {
  const type = inquiryType.value;
  const prompts = inquiryPrompts[type];
  document.getElementById('inquiry-help').textContent = prompts.help;
  document.getElementById('company-label').textContent = prompts.company;
  document.getElementById('company').placeholder = prompts.companyPlaceholder;
  document.getElementById('email-label').textContent = type === 'investor' ? 'Email' : 'Work email';
  document.getElementById('email').placeholder = type === 'investor' ? 'you@example.com' : 'you@company.com';
  document.getElementById('message-label').textContent = prompts.label;
  document.getElementById('message-help').textContent = prompts.messageHelp;
  message.placeholder = prompts.placeholder;
  document.getElementById('interest-field').hidden = type !== 'engineering';
  interest.disabled = type !== 'engineering';
  interest.required = type === 'engineering';
}
inquiryType.addEventListener('change', updateInquiryFields);
updateInquiryFields();


const submitButton = document.getElementById('submit-inquiry');
const formStatus = document.getElementById('form-status');
let sending = false;

function showStatus(text, isError = false) {
  formStatus.textContent = text;
  formStatus.classList.toggle('is-error', isError);
  formStatus.hidden = false;
  formStatus.focus();
}

inquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || !inquiryForm.reportValidity()) return;
  const captchaToken = inquiryForm.querySelector('[name="h-captcha-response"]')?.value;
  if (!captchaToken) {
    showStatus('Please complete the CAPTCHA before sending. If it hasn’t loaded, refresh the page or check whether your browser is blocking it.', true);
    return;
  }
  const formData = new FormData(inquiryForm);
  if (formData.get('botcheck')) return;
  formData.set('subject', `Equipotential Lab — ${inquiryType.selectedOptions[0].textContent}`);
  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  inquiryForm.setAttribute('aria-busy', 'true');
  formStatus.hidden = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(inquiryForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      showStatus('Your inquiry was not accepted. Please check the CAPTCHA and try again. Your entries have been kept.', true);
      return;
    }
    inquiryForm.reset();
    updateInquiryFields();
    showStatus('Thank you—your inquiry has been submitted to Equipotential Lab.');
  } catch {
    showStatus('We couldn’t confirm that your inquiry was delivered. Your entries have been kept. Please check your connection before trying again.', true);
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    submitButton.innerHTML = 'Start a conversation <span aria-hidden="true">↗</span>';
    inquiryForm.removeAttribute('aria-busy');
    if (window.hcaptcha) window.hcaptcha.reset();
  }
});

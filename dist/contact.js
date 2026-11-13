const inquiryForm = document.getElementById('inquiry-form');
const previewButton = document.getElementById('preview-submit');
const formStatus = document.getElementById('form-status');
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

inquiryType.addEventListener('change', () => {
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
  formStatus.hidden = true;
});

// This form preview deliberately has no endpoint and makes no network requests.
inquiryForm.addEventListener('submit', (event) => event.preventDefault());
previewButton.addEventListener('click', () => {
  if (!inquiryForm.reportValidity()) return;
  formStatus.textContent = 'The form preview is complete. Nothing was sent or saved. Once the contact form is connected, this is where your inquiry will be submitted.';
  formStatus.hidden = false;
});

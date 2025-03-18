
// Company Information types
export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
}

// System Preferences types
export interface SystemPreferences {
  dateFormat: string;
  currency: string;
  language: string;
}

// Save company information to localStorage
export const saveCompanyInfo = (info: CompanyInfo): void => {
  localStorage.setItem('companyInfo', JSON.stringify(info));
};

// Get company information from localStorage
export const getCompanyInfo = (): CompanyInfo => {
  const defaultInfo: CompanyInfo = {
    name: 'Acme Corporation',
    email: 'info@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, Enterprise City, EC 12345',
    taxId: 'US123456789'
  };
  
  const savedInfo = localStorage.getItem('companyInfo');
  return savedInfo ? JSON.parse(savedInfo) : defaultInfo;
};

// Save system preferences to localStorage
export const saveSystemPreferences = (preferences: SystemPreferences): void => {
  localStorage.setItem('systemPreferences', JSON.stringify(preferences));
};

// Get system preferences from localStorage
export const getSystemPreferences = (): SystemPreferences => {
  const defaultPreferences: SystemPreferences = {
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'en'
  };
  
  const savedPreferences = localStorage.getItem('systemPreferences');
  return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
};

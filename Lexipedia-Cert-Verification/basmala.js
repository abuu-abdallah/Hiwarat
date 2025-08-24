import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// UI Components from shadcn/ui
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-3xl shadow-2xl ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h2 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h2>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const Toaster = () => <div id="toaster-root"></div>;
const useToast = () => {
  const showToast = (message, title) => {
    console.log(`Toast: ${title} - ${message}`);
    const toasterRoot = document.getElementById('toaster-root');
    if (toasterRoot) {
      const toastElement = document.createElement('div');
      toastElement.className = 'fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg bg-green-500 text-white';
      toastElement.textContent = message;
      toasterRoot.appendChild(toastElement);
      setTimeout(() => {
        toasterRoot.removeChild(toastElement);
      }, 3000);
    }
  };
  return { toast: showToast };
};


// Main React component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [certificateData, setCertificateData] = useState(null);

  // Hardcoded example certificate data
  useEffect(() => {
    const dummyCertificateData = {
      id: 'example-cert-01',
      studentName: 'Jane Doe',
      courseName: 'Advanced English Proficiency',
      issueDate: '2023-10-26',
      expiryDate: '2024-10-26',
    };
    setCertificateData(dummyCertificateData);
    setIsLoading(false);
  }, []);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-gray-600">Loading certificate details...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
          Verification Result
        </h2>
        {certificateData ? (
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-500 font-medium">Student Name:</p>
                <p className="font-semibold text-gray-800">{certificateData.studentName}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-500 font-medium">Course:</p>
                <p className="font-semibold text-gray-800">{certificateData.courseName}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-500 font-medium">Issue Date:</p>
                <p className="font-semibold text-gray-800">{certificateData.issueDate}</p>
              </div>
              {certificateData.expiryDate && (
                <div className="flex justify-between items-center border-b pb-2">
                  <p className="text-gray-500 font-medium">Expiry Date:</p>
                  <p className="font-semibold text-gray-800">{certificateData.expiryDate}</p>
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-medium">Certificate ID:</p>
                <p className="font-mono text-sm text-gray-600">{certificateData.id}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-xl text-center">
            <CardContent>
              <p className="text-lg text-red-500">Certificate not found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-8 font-sans antialiased text-gray-900 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {renderContent()}
      </div>
      <Toaster />
    </div>
  );
}

import React from "react";
import Dashboard from "./dashboard";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
            <p className="text-gray-700">Please refresh the page or contact support.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
          Rockfall Prediction System
        </header>
        <Dashboard />
      </div>
    </ErrorBoundary>
  );
}

export default App;

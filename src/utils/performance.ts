import { useEffect } from "react";

export const measurePerformance = (metric: string) => {
  if (window.performance) {
    const perfEntry = performance.getEntriesByName(metric);
    if (perfEntry.length > 0) {
      console.log(`${metric}: ${perfEntry[0].duration}ms`);
    }
  }
};

// Usage in components
export const usePerformanceMeasurement = (metric: string) => {
  useEffect(() => {
    performance.mark(`${metric}-start`);
    // Load products
    performance.mark(`${metric}-end`);
    performance.measure(metric, `${metric}-start`, `${metric}-end`);
    measurePerformance(metric);
  }, [metric]);
}; 
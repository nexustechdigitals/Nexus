/**
 * Performance monitoring utility for tracking Core Web Vitals
 * Helps identify performance bottlenecks in production
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!window.requestIdleCallback) {
      return;
    }

    requestIdleCallback(() => {
      this.measureWebVitals();
    });
  }

  /**
   * Measure Core Web Vitals
   */
  private measureWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          const lcpValue = lastEntry.startTime + lastEntry.duration;
          this.recordMetric('LCP', lcpValue);
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const eventEntry = entry as any;
          this.recordMetric('FID', eventEntry.duration || 0);
        }
      });

      observer.observe({ entryTypes: ['first-input', 'event'] });
    } catch (e) {
      // Not supported
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.recordMetric('CLS', clsValue);
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Not supported
    }

    // Navigation Timing
    if ('navigation' in window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as any;
      if (perfData) {
        const pageLoadTime = perfData.loadEventEnd - perfData.loadEventStart;
        this.recordMetric('Page Load Time', pageLoadTime);

        const connectTime = perfData.responseEnd - perfData.requestStart;
        this.recordMetric('Connect Time', connectTime);

        const renderTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        this.recordMetric('Render Time', renderTime);
      }
    }
  }

  /**
   * Record a performance metric
   */
  private recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: this.getRating(name, value),
    };

    this.metrics.set(name, metric);

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (${metric.rating})`);
    }
  }

  /**
   * Get performance rating based on thresholds
   */
  private getRating(
    metric: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, { good: number; poor: number }> = {
      'LCP': { good: 2500, poor: 4000 },
      'FID': { good: 100, poor: 300 },
      'CLS': { good: 0.1, poor: 0.25 },
      'Page Load Time': { good: 3000, poor: 5000 },
      'Connect Time': { good: 1000, poor: 3000 },
      'Render Time': { good: 1000, poor: 3000 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'needs-improvement';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get a specific metric
   */
  getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.get(name);
  }

  /**
   * Send metrics to analytics service
   */
  sendMetrics(endpoint: string) {
    const metrics = this.getMetrics();
    if (metrics.length === 0) return;

    // Use sendBeacon for reliability
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon(endpoint, JSON.stringify(metrics));
    } else {
      // Fallback to fetch
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(metrics),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {
        // Silently fail if analytics endpoint is unreachable
      });
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-initialize in production
if (import.meta.env.PROD) {
  performanceMonitor.init();
}

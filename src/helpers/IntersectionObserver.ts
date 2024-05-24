/**
 * Create an IntersectionObserver instance with a default threshold of 0.1
 * @param options - IntersectionObserverInit
 * @returns IntersectionObserver
 */
export const createIntersectionObserver = (
  animatedClass?: string,
  options?: IntersectionObserverInit
) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const targetClass = animatedClass || "faded";
        if (entry.isIntersecting) {
          entry.target.classList.add(targetClass);
        }
      });
    },
    { threshold: 0.1, ...options },
  );
}

/**
 * Observe a target element
 * @param observer - IntersectionObserver
 * @param query - string
 */
export const observe = (observer: IntersectionObserver, query: string) => {
  const target = document.querySelector(query);
  if (target) {
    observer.observe(target);
  } else {
    console.error(`Element with query "${query}" not found`);
  }
}

/**
 * Unobserve a target element
 * @param observer - IntersectionObserver
 * @param query - string
 */
export const unobserve = (observer: IntersectionObserver, query: string) => {
  const target = document.querySelector(query);
  if (target) {
    observer.unobserve(target);
  } else {
    console.error(`Element with query "${query}" not found`);
  }
}

/**
 * Observe multiple query elements
 * @param observer - IntersectionObserver
 * @param query - string[]
 */
export const observeAll = (observer: IntersectionObserver, query: string) => {
  document.querySelectorAll(query).forEach((element) => observer.observe(element));
}

/**
 * Unobserve multiple query elements
 * @param observer - IntersectionObserver
 * @param query - string[]
 */
export const unobserveAll = (observer: IntersectionObserver, query: string[]) => {
  query.forEach((query) => {
    document.querySelectorAll(query).forEach((element) => observer.unobserve(element));
  });
}
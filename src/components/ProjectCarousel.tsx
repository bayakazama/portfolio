import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);
  const maxIndex = Math.max(0, projects.length - itemsPerPage);
  const showArrows = projects.length > itemsPerPage;

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.defaultPlaybackRate = 2;
      videoRef.current.playbackRate = 2;
    }
  }, [isVideoOpen]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsPerPage);

  const handleCardClick = (project: Project) => {
    if (project.id === 3) {
      setIsVideoOpen(true);
      return;
    }
    if (project.id === 2) {
      window.location.href = '/oblig-3';
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows - Only show if more than 3 projects */}
      {showArrows && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute -left-8 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full hover:bg-amber-100/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6 text-white/90 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute -right-8 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full hover:bg-amber-100/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6 text-white/90 group-hover:text-white transition-colors" />
          </button>
        </>
      )}

      {/* Cards Container */}
      <div className="flex gap-6 sm:gap-10 lg:gap-12 justify-center">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className={`flex-shrink-0 w-[85vw] max-w-[26rem] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] rounded-lg overflow-hidden border border-amber-700/30 bg-gradient-to-br from-amber-900/50 to-amber-950/60 hover:border-amber-600/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-amber-900/20 group ${(project.id === 2 || project.id === 3) ? 'cursor-pointer' : ''}`}
            onClick={() => handleCardClick(project)}
            role={(project.id === 2 || project.id === 3) ? "button" : undefined}
            tabIndex={(project.id === 2 || project.id === 3) ? 0 : -1}
            onKeyDown={(event) => {
              if ((project.id === 2 || project.id === 3) && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                handleCardClick(project);
              }
            }}
          >
            {/* Image Container */}
            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-amber-900/50">
              <img
                src={project.image}
                alt={project.alt}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-950/30 opacity-40 group-hover:opacity-20 transition-opacity"></div>
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6 space-y-3">
              <h3 className="text-xl sm:text-2xl font-light text-amber-50 group-hover:text-amber-100 transition-colors">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-amber-100/80 font-dark leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Worldly project video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-xl border border-white/60 bg-amber-950/95 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 rounded-full border border-white/50 px-2.5 py-1 text-sm text-white/90 hover:text-white"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              Close
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <video
                src="/Snapchat-1364334733.mp4"
                className="h-full w-full"
                controls
                playsInline
                ref={videoRef}
              />
            </div>
          </div>
        </div>
      )}

      {/* Pagination Dots */}
      {showArrows && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(Math.min(index * itemsPerPage, maxIndex))}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / itemsPerPage)
                  ? 'bg-amber-600/80 w-6'
                  : 'bg-amber-700/40 hover:bg-amber-600/60'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

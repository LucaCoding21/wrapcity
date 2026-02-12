"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const MOBILE_POSTS_LIMIT = 3;

const facebookPosts = [
  {
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%2F%3Ffbid%3D717736144623829%26set%3Dpb.100091623488082.-2207520000&show_text=false&width=500",
    type: "photo",
    postUrl: "https://www.facebook.com/photo/?fbid=717736144623829&set=pb.100091623488082.-2207520000",
  },
  {
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1448158427032189&show_text=false&width=500",
    type: "reel",
    postUrl: "https://www.facebook.com/reel/1448158427032189",
  },
  {
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D438365009227612%26set%3Dpb.100091623488082.-2207520000%26type%3D3&show_text=false&width=500",
    type: "photo",
    postUrl: "https://www.facebook.com/photo.php?fbid=438365009227612&set=pb.100091623488082.-2207520000&type=3",
  },
  {
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D197056866691762%26set%3Dpb.100091623488082.-2207520000%26type%3D3&show_text=false&width=500",
    type: "photo",
    postUrl: "https://www.facebook.com/photo.php?fbid=197056866691762&set=pb.100091623488082.-2207520000&type=3",
  },
  {
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D355393224191458%26set%3Dpb.100091623488082.-2207520000%26type%3D3&show_text=false&width=500",
    type: "photo",
    postUrl: "https://www.facebook.com/photo.php?fbid=355393224191458&set=pb.100091623488082.-2207520000&type=3",
  },
  {
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%2F%3Ffbid%3D287166287680819%26set%3Dpb.100091623488082.-2207520000&show_text=false&width=500",
    type: "photo",
    postUrl: "https://www.facebook.com/photo/?fbid=287166287680819&set=pb.100091623488082.-2207520000",
  },
];

function FacebookPostCard({
  post,
  index,
  isMobile,
}: {
  post: (typeof facebookPosts)[number];
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <div ref={cardRef} data-post-card className="group">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {post.type === "reel" && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            REEL
          </div>
        )}

        <div className="aspect-square overflow-hidden">
          {isMobile ? (
            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2]/10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-near-black">
                {post.type === "reel" ? "Watch Reel" : "View Post"}
              </p>
              <p className="mt-1 text-xs text-charcoal/60">Tap to open on Facebook</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#1877F2] px-4 py-2 text-xs font-medium text-white">
                Open on Facebook
              </div>
            </a>
          ) : (
            <>
              {(!isVisible || !iframeLoaded) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100">
                  <div className="mb-3 h-10 w-10 animate-pulse rounded-full bg-neutral-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
                </div>
              )}
              {isVisible && (
                <iframe
                  src={post.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none", overflow: "hidden", minHeight: "500px", pointerEvents: "none" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`Facebook ${post.type} ${index + 1}`}
                  loading="lazy"
                  onLoad={handleIframeLoad}
                />
              )}
            </>
          )}
        </div>

        {!isMobile && (
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`View Facebook ${post.type} ${index + 1}`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-white text-sm font-medium">View on Facebook →</span>
        </div>
      </div>
    </div>
  );
}

export default function FacebookPosts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setHasMounted(true);
  }, []);

  const displayedPosts = isMobile ? facebookPosts.slice(0, MOBILE_POSTS_LIMIT) : facebookPosts;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-post-card]");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32"
    >
      <div className="container-wide">
        <div ref={headerRef} className="mb-16 text-center">
          <p className="label-uppercase mb-4 text-power-red">Follow Our Work</p>
          <h2 className="heading-section text-near-black">
            LATEST FROM FACEBOOK
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {hasMounted &&
            displayedPosts.map((post, i) => (
              <FacebookPostCard
                key={i}
                post={post}
                index={i}
                isMobile={isMobile}
              />
            ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.facebook.com/p/Wrap-City-100091623488082/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#1877F2] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#166FE5] hover:shadow-xl hover:shadow-[#1877F2]/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Follow Us on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  name: string;
  url: string;
}

interface NavBarProps {
  className?: string;
  items: NavItem[];
}

export function NavBar({items, className}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionName = Object.keys(sectionRefs.current).find(
                  (key) => sectionRefs.current[key] === entry.target,
              );
              if (sectionName) {
                setActiveTab(sectionName);
              }
            }
          });
        },
        {threshold: 0.6},
    );

    items.forEach((item) => {
      const sectionId = item.url.replace("#", "");
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionRefs.current[item.name] = sectionElement;
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
      <div
          className={cn(
              "fixed left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
              className,
          )}
      >
        <div
            className="flex items-center gap-6 bg-background/5 border border-transparent backdrop-blur-lg py-2 px-3 rounded-full shadow-lg">
          {items.map((item) => {
            const IconComponent = item.icon; // Use the icon as a React component
            const isActive = activeTab === item.name;

            return (
                <a
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                        "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                        "text-foreground/80 hover:text-primary",
                        isActive && "bg-muted text-primary",
                    )}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  <span className="md:hidden">
                <IconComponent size={18} strokeWidth={2.5}/>
              </span>
                  {isActive && (
                      <motion.div
                          layoutId="lamp"
                          className="absolute inset-0 w-full bg-black/5 rounded-full -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                      >
                        <div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-t-full">
                          <div
                              className="absolute w-12 h-6 bg-black/20 rounded-full blur-md -top-2 -left-2"/>
                          <div
                              className="absolute w-8 h-6 bg-black/20 rounded-full blur-md -top-1"/>
                          <div
                              className="absolute w-4 h-4 bg-black/20 rounded-full blur-sm top-0 left-2"/>
                        </div>
                      </motion.div>
                  )}
                </a>
            );
          })}
        </div>
      </div>
  );
}

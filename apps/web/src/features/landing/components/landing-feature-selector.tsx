"use client";

import { useId, useRef, useState } from "react";

import { getNextLandingSectionIndex, landingSections } from "../landing-sections";

export function LandingFeatureSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabsId = useId();
  const activeSection = landingSections[activeIndex] ?? landingSections[0];

  function selectWithKeyboard(key: string) {
    const nextIndex = getNextLandingSectionIndex(activeIndex, key, landingSections.length);

    if (nextIndex === activeIndex) {
      return;
    }

    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="features" className="persona-showcase" aria-labelledby={`${tabsId}-title`}>
      <div className="persona-showcase__grain" aria-hidden="true" />

      <div className="persona-showcase__intro">
        <p className="persona-showcase__eyebrow">Todo en el mismo sitio</p>
        <h2 id={`${tabsId}-title`}>Tu novela cambia.<br />Tu espacio también.</h2>
        <p>Elige una parte de leeer para descubrir cómo te acompaña durante todo el proceso.</p>
      </div>

      <div className="persona-showcase__body">
        <div
          className="persona-menu"
          role="tablist"
          aria-label="Partes de leeer"
          aria-orientation="vertical"
          onKeyDown={(event) => {
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              selectWithKeyboard(event.key);
            }
          }}
        >
          {landingSections.map((section, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={section.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${tabsId}-tab-${section.id}`}
                className="persona-menu__item"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tabsId}-panel-${section.id}`}
                tabIndex={isActive ? 0 : -1}
                data-active={isActive ? "true" : "false"}
                onClick={() => setActiveIndex(index)}
              >
                <span className="persona-menu__shadow" aria-hidden="true" />
                <span className="persona-menu__shape">
                  <span className="persona-menu__number">0{index + 1}</span>
                  <span className="persona-menu__label">{section.shortTitle}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="persona-panel-wrap">
          <span className="persona-panel-wrap__slash persona-panel-wrap__slash--top" aria-hidden="true" />
          <article
            key={activeSection.id}
            id={`${tabsId}-panel-${activeSection.id}`}
            className="persona-panel"
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${activeSection.id}`}
            tabIndex={0}
          >
            <p className="persona-panel__kicker">{activeSection.kicker}</p>
            <h3>{activeSection.title}</h3>
            <p className="persona-panel__copy">{activeSection.description}</p>
            <ul>
              {activeSection.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="persona-panel__count" aria-hidden="true">
              0{activeIndex + 1}<span>/0{landingSections.length}</span>
            </p>
          </article>
          <span className="persona-panel-wrap__slash persona-panel-wrap__slash--bottom" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

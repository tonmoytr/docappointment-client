export default function InfoRibbon({ infoItems }) {
  return (
    <section className="w-full bg-content1 border-y border-divider shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Responsive Grid: Stacks into a single column on mobile, 
          2 columns on tablets, and a clean 4-column layout on desktops.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 divide-y sm:divide-y-0 lg:divide-x divide-divider">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center space-x-4 px-2 lg:px-6 transition-all cursor-default group
                  ${index === 0 ? "lg:pl-0" : ""} 
                  ${index % 2 === 1 ? "sm:pl-8 lg:pl-6" : ""}
                  ${index > 1 ? "pt-6 sm:pt-0" : ""}
                  ${index === 0 || index === 2 ? "pt-0" : ""}
                `}
              >
                {/* Clean Geometric Icon Wrapper with Premium Fills */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent dark:bg-warning/10 dark:text-warning flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Icon size={24} />
                </div>

                {/* Text Layout Block */}
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent dark:group-hover:text-warning">
                    {item.line1}
                  </p>
                  <p className="text-xs font-medium text-default-400 dark:text-default-500">
                    {item.line2}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

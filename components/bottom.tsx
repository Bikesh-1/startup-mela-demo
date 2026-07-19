import {
  Users,
  Zap,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function FeatureBar() {
  const features = [
    {
      icon: Users,
      title: "Group Savings",
      desc: "Save together, grow stronger.",
    },
    {
      icon: Zap,
      title: "Auto Contributions",
      desc: "Automate payments, stay consistent.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Secure",
      desc: "Your data and money are always safe.",
    },
    {
      icon: Target,
      title: "Achieve Goals",
      desc: "Plan, track and reach your goals together.",
    },
  ];

  return (
    <div className="mt-16 mx-auto max-w-8xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-[28px] border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-8 ${
                index !== features.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-gray-200"
                  : ""
              }`}
            >
              <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center shrink-0">
                <Icon className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
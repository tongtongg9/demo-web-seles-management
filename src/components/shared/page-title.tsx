import React from 'react';

type PageTitleProps = {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    actions?: Array<React.ReactNode>;
};

export default function PageTitle({ title, subtitle, actions = [] }: PageTitleProps) {
    const t = typeof title === 'string' ? <h4 className="font-bold text-3xl text-primary">{title}</h4> : title;
    const subT = typeof subtitle === 'string' ? <p className="mt-2 text-secondary-foreground">{subtitle}</p> : subtitle;

    return (
        <div className="flex md:flex-row flex-col justify-between md:items-start gap-4">
            <div className="flex-1">
                {t}
                {subtitle && subT}
            </div>

            {actions?.length > 0 ? (
                <div className="flex flex-wrap items-center gap-4 ml-auto md:ml-0">
                    {actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

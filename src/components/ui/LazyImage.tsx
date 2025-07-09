import React, { ReactNode } from "react";
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import LoadingSpinner from "./LoadingSpinner";

type LazyImageProps = {
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    children?: ReactNode;
} & Omit<LazyLoadImageProps, "src" | "alt" | "placeholder">;

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = "",
    wrapperClassName = "",
    children,
    ...rest
}) => {
    return (
        <div className={`relative ${wrapperClassName}`}>
            <LazyLoadImage
                src={src}
                alt={alt}
                className={className}
                placeholder={
                    <div className="w-full h-full">
                        <LoadingSpinner size="big" />
                    </div>
                }
                {...rest}
            />
            {children}
        </div>
    );
};

export default LazyImage;

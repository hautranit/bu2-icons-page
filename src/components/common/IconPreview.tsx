import React, { useMemo } from "react";
import { CodeOutlined, TextBlockOutlined } from "beca-icons";
import { message } from "beca-ui";

interface Props {
  outlinedName: string;
  boldName?: string;
  icon: React.ReactNode;
  boldIcon?: React.ReactNode;
  variant: "outlined" | "bold";
  color?: string;
}

const IconPreview = (props: Props) => {
  const { outlinedName, boldName, icon, boldIcon, variant, color } = props;

  const onCopySvg = () => {
    const iconElement = document.querySelector(`#icon-${outlinedName}`);
    if (iconElement) {
      const iconSvg = iconElement.querySelector(".beca-icon");
      if (iconSvg) {
        navigator.clipboard.writeText(iconSvg.innerHTML);
        message.success("Đã copy svg icon");
      }
    }
  };

  const isValid = useMemo(() => {
    return variant === "bold" ? boldName && boldIcon : outlinedName && icon;
  }, [variant, boldName, boldIcon, outlinedName, icon]);

  return isValid ? (
    <div className="icon-preview" style={{ color: color }}>
      <div className="icon" id={"icon-" + outlinedName}>
        {variant === "bold" ? boldIcon : icon}
      </div>
      <div className="name">
        <div>{variant === "bold" ? boldName : outlinedName}</div>
      </div>
      <div className="actions">
        <TextBlockOutlined
          className="icon-btn"
          onClick={() => {
            navigator.clipboard.writeText(
              `${variant === "bold" ? boldName : outlinedName}`,
            );
            message.success("Đã copy tên icon");
          }}
        />
        <CodeOutlined
          className="icon-btn"
          onClick={() => {
            onCopySvg();
          }}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default IconPreview;

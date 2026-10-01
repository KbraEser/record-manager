import { Button, Tooltip, type ButtonProps } from "@mui/material"
import type { ReactNode } from "react"

interface ActionButtonProps {
    label: string
    onClick?: () => void
    tips?: string
    icon?: ReactNode
    color?:ButtonProps['color']
    variant?: ButtonProps['variant']
    type?: ButtonProps['type']
    disabled?: boolean
}

export function ActionButton({
  label,
  onClick,
  tips = '',
  icon,
  color = 'primary',
  variant = 'contained',
  type = 'button',
  disabled = false,
}: ActionButtonProps) {
  return (
    <Tooltip title={tips} arrow>
      <span>
        <Button
          type={type}
          color={color}
          variant={variant}
          startIcon={icon}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </Button>
      </span>
    </Tooltip>
  )
}

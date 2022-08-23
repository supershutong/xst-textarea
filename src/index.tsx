import * as React from 'react';
import ResizableTextArea from './ResizableTextArea';
import type { AutoSizeType } from './ResizableTextArea';

export type HTMLTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  autoSize?: boolean | AutoSizeType;
  allowInputOverMax?: boolean;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onResize?: (size: { width: number; height: number }) => void;
}

export interface TextAreaState {
  value: any;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  resizableTextArea!: ResizableTextArea;

  constructor(props: TextAreaProps) {
    super(props);
    const value =
      typeof props.value === 'undefined' || props.value === null
        ? props.defaultValue
        : props.value;
    this.state = {
      value,
    };
  }

  static getDerivedStateFromProps(nextProps: TextAreaProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  setValue(value: string, callback?: () => void) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
  }

  focus = () => {
    this.resizableTextArea.textArea.focus();
  };

  blur() {
    this.resizableTextArea.textArea.blur();
  }

  saveTextArea = (resizableTextArea: ResizableTextArea) => {
    this.resizableTextArea = resizableTextArea;
  };

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, allowInputOverMax = false, maxLength } = this.props;
    let value = e.target.value;
    if (!allowInputOverMax && maxLength) {
      // spread操作符用于处理表情等合成字符slice后错误或乱码等问题，如：'👨👨👨'.slice(0, 2) === '👨'
      value = [...(value ?? '')].slice(0, maxLength).join('');
    }
    this.setValue(value, () => {
      this.resizableTextArea.resizeTextarea();
    });
    e.target.value = value;
    if (onChange) {
      onChange(e);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  render() {
    return (
      <ResizableTextArea
        {...this.props}
        value={this.state.value}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  }
}

export { ResizableTextArea };
export type { AutoSizeType };

export default TextArea;

import * as React from 'react';
import './style.less'

interface HelloProps {
	name: string,
	age: number
}
class Hello extends React.Component<HelloProps, {}>{
	render() {
		return (
			<div className="hello">
				我是，{this.props.name},今年{this.props.age}岁了
			</div>
		);
	};
}

export default Hello
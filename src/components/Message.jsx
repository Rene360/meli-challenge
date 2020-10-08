import React from 'react';

export default function Message(props){
	return(
		<div className ="container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<h2 className={'message-title'}>Ha ocurrido un ERROR!</h2>
					<p className={'message-text'}>{props.message}</p>
				</div>
			</div>

		</div>
	);
}
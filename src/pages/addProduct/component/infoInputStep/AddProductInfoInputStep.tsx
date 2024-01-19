import React, { useState } from 'react';
import GoldenPriceDecision from './GoldenPriceDecision';
import SellerInfoInput from './SellerInfoInput';
import CommissionInfo from './CommissionInfo';

interface Props {
	onNextStep: () => void;
	onPrevStep?: () => void;
}

const AddProductInfoInputStep = ({ onNextStep }: Props) => {
	const [goldenPrice, setGoldenPrice] = useState<number>(-1);
	const originPrice = 200000;

	const handleNextStep = () => {
		if (goldenPrice >= 0 && goldenPrice < originPrice) {
			onNextStep();
		} else {
			let alertMessage = '';
			if (goldenPrice < 0) {
				alertMessage = '희망 판매가를 입력해주세요!';
			} else if (goldenPrice >= originPrice) {
				alertMessage = '희망 판매가는 기존 구매가보다 낮아야 합니다!';
			}
			alert(alertMessage);
		}
	};

	function setSellerInfo(info: string): void {
		throw new Error('Function not implemented.');
	}

	return (
		<>
			<div className="fixed top-[6rem] w-[375px] bg-white h-[3rem]" />
			<h2 className="text-body ml-5 mb-4 fixed top-[6.5rem]">판매 정보 입력</h2>
			<div className="fixed top-[9rem] w-[375px] h-[0.4375rem] bg-lightGray" />

			{/* 골든특가 결정 */}
			<div className="pt-[11rem] px-5">
				<GoldenPriceDecision
					yanoljaPrice="100,000"
					setGoldenPrice={setGoldenPrice}
					originPrice="200,000"
				/>
			</div>

			<div className="mt-[2rem] w-[375px] h-[0.4375rem] bg-lightGray" />
			{/* 판매자 한마디 */}
			<div className="mx-5 text-black">
				<SellerInfoInput onSellerInfoChange={setSellerInfo} />
			</div>
			{/* 수수료 안내 */}
			<div className="mx-5 text-black">
				<CommissionInfo goldenPrice={goldenPrice} />
			</div>
			{/* 다음 버튼 */}
			<div className="bg-gray-200 flex justify-center">
				<button
					type="button"
					className={`mx-auto w-[20.9375rem] h-[3.125rem] rounded-xl text-lg mt-[3.5625rem] mb-[2.1875rem] ${
						goldenPrice >= 0 && goldenPrice < originPrice
							? 'cursor-pointer bg-main text-white'
							: 'cursor-not-allowed bg-borderGray text-descGray'
					}`}
					onClick={handleNextStep}
				>
					다음
				</button>
			</div>
		</>
	);
};

export default AddProductInfoInputStep;

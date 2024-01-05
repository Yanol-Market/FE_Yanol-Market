import React, { useState } from 'react';
import ReservationItem, { Reservation } from './ReservationItem';

interface Props {
	onNextStep: () => void;
}

const AddProductSelectionStep = ({ onNextStep }: Props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const hasReservations = true; // 예약 내역이 있는지 여부를 나타내는 변수

	const renderContent = () => {
		const reservations: Reservation[] = [
			// 예약 정보 배열
			{
				reservationNumber: 2312120123456,
				reservationDate: '2023.12.12',
				hotelName: '에코그린 리조트 호텔',
				roomInfo: '디럭스 더블 2인 (최대 2인)',
				totalAmount: '2박 300,000원',
				checkInDate: '2024.01.03',
				checkOutDate: '2024.01.05',
			},
			{
				reservationNumber: 2312120123456,
				reservationDate: '2024.01.01',
				hotelName: '가평 푸른하늘 펜션',
				roomInfo: '디럭스 더블 2인 (최대 2인)',
				totalAmount: '2박 300,000원',
				checkInDate: '2024.01.03',
				checkOutDate: '2024.01.05',
			},
			{
				reservationNumber: 2312120123456,
				reservationDate: '2023.12.12',
				hotelName: '에코그린 리조트 호텔',
				roomInfo: '디럭스 더블 2인 (최대 2인)',
				totalAmount: '2박 300,000원',
				checkInDate: '2024.01.03',
				checkOutDate: '2024.01.05',
			},
			{
				reservationNumber: 2312120123456,
				reservationDate: '2024.01.01',
				hotelName: '가평 푸른하늘 펜션',
				roomInfo: '디럭스 더블 2인 (최대 2인)',
				totalAmount: '2박 300,000원',
				checkInDate: '2024.01.03',
				checkOutDate: '2024.01.05',
			},
		];

		if (isLoggedIn) {
			return (
				<>
					<h3 className="text-body ml-5 mt-[2.125rem] font-semibold">
						나의 예약 내역
					</h3>
					{!hasReservations ? (
						<>
							<div className="flex">
								<p className="mx-auto text-[14px] mt-[13.3125rem] text-[#828282]">
									양도 가능한 예약 내역이 없어요!
								</p>
							</div>
						</>
					) : (
						<div className="flex flex-col">
							{reservations.map((reservation, index) => (
								<ReservationItem key={index} reservation={reservation} />
							))}
							{/* 다음 버튼 밑으로 뒤에 컨텐츠 가림*/}
							<div className="fixed bottom-0 w-[375px] bg-white h-10" />
							{/* 다음 버튼 */}
							<div className="fixed bottom-7 left-0 right-0 bg-gray-200 flex justify-center">
								<button
									type="button"
									className="mx-auto bg-borderGray w-[20.9375rem] h-[3.125rem] rounded-xl text-[#828282] cursor-pointer text-lg"
									onClick={onNextStep}
								>
									다음
								</button>
							</div>{' '}
						</div>
					)}
				</>
			);
		} else {
			// 비로그인 상태일 때 야놀자 로그인 안내 표시
			return (
				<>
					<div className="flex items-center">
						<img
							className="mx-auto mt-[10.125rem] mb-[13.1875rem]"
							src="/assets/images/yanoljaLogo.svg"
							alt="yanolja Logo"
						/>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="mx-auto bg-[#FF3478] w-[20.9375rem] h-[3.125rem] rounded-xl text-white cursor-pointer text-m"
						>
							로그인
						</button>
						<p className="text-lg mb-6 mt-6">
							야놀자 계정으로 간편하게 판매해보세요!
						</p>

						<p className="text-sm max-w-[245px]">
							해당 서비스는 야놀자에서 예약된 건에 한해서 이용 가능합니다. 곧
							외부 숙소 예약까지 확장할 예정이오니 조금만 기다려주세요!
						</p>
					</div>
				</>
			);
		}
	};

	return (
		<div>
			<h2 className="text-body ml-5 mb-4">판매 상품 선택</h2>
			<div className="w-full h-[0.4375rem] bg-[#FAFAFA]" />
			{renderContent()}
		</div>
	);
};

export default AddProductSelectionStep;

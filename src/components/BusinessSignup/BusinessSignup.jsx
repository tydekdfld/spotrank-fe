import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessSignup.css';

const BusinessSignup = () => {
  const [formData, setFormData] = useState({
    businessNumber: '',
    storeName: '',
    address: '',
    category: 'restaurants',
    description: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('사업자 정보:', formData);
    navigate('/login');
  };

  const isFormValid = () => {
    return (
      formData.businessNumber &&
      formData.storeName &&
      formData.address &&
      formData.category
    );
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="business-signup-container">
      <h1 className="business-signup-title" onClick={handleLogoClick}>SpotRank</h1>
      <form onSubmit={handleSubmit} className="business-signup-form">
        <div className="form-group">
          <label>사업자등록번호</label>
          <input
            type="text"
            name="businessNumber"
            value={formData.businessNumber}
            onChange={handleChange}
            required
          />
          <button type="button">확인</button>
        </div>
        <div className="form-group">
          <label>가게 상호명</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="restaurants">음식점</option>
            <option value="cafes">카페</option>
          </select>
        </div>
        <div className="form-group">
          <label>소개글</label>
          <textarea
            name="description"
            placeholder="1000자 이하로 작성해주세요"
            value={formData.description}
            onChange={handleChange}
            maxLength="1000"
          />
        </div>
        <div className="form-group">
          <label>이미지 가져오기</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid()}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default BusinessSignup;
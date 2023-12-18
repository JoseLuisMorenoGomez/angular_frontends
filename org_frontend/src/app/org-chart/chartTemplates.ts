// nodeTemplates.ts

export const nodeContentTemplate = `
    <div style='width:{width}px;height:{height}px;padding-top:{imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
        <div style="font-family: 'Inter', sans-serif;background-color:{backgroundColor};margin-left:-1px;width:{width - 2}px;height:{height - imageDiffVert}px;border-radius:10px;border:{border}">
          <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">{id}</div>
          <div style="background-color:{backgroundColor};margin-top:{-imageDiffVert - 20}px;margin-left:15px;border-radius:100px;width:50px;height:50px;"></div>
          <div style="margin-top:{-imageDiffVert - 20}px;"><img src="{image}" style="margin-left:20px;border-radius:100px;width:40px;height:40px;" /></div>
          <div style="font-size:15px;color:{textColor};margin-left:20px;margin-top:10px">{name}</div>
          <div style="color:{textColor};margin-left:20px;margin-top:3px;font-size:10px;">{position}</div>
        </div>
    </div>
    `;  

export const pagingButtomTemplate = `
    <div style="margin-top:50px;">
      <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;background-color:{nodeBackgroundColor}">
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>
          </svg>
        </div>
        <div style="line-height:2"> Show next {min}  nodes </div>
      </div>
    </div>
  `;    
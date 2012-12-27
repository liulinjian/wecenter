// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
myMarkdownSettings = {
    nameSpace:          'markdown', // Useful to prevent multi-instances CSS conflict
    previewParser:  function(content){
        var html = Markdown(content);
        return html;
    },
    previewInElement : '#markItUpPreviewFrames',
    onShiftEnter:       {keepDefault:false, openWith:'\n\n'},
    markupSet: [
        {name:_t('粗体'), key:"B", openWith:'**', closeWith:'**'},
        {name:_t('斜体'), key : "I", openWith : '*', closeWith : '*'},
        {separator:'---------------' },        
        {name:_t('引用'), openWith:'> '},
        {name:_t('代码'), openWith:'{{{\n', closeWith:'\n}}}'},
        {separator:'---------------' },
        {name:_t('普通列表'), openWith:'- ' },
        {name:_t('数字列表'), openWith:function(markItUp) {
            return markItUp.line+'. ';
        }},
        {separator:'---------------' },
        {name:_t('图片'), key:"P", openWith:function(){$.uploadPicture()}},
        {separator:'---------------'},
        {name:_t('大标题'), key : "1", openWith:'\n## '},
        {name:_t('小标题'), key : "2", openWith : '\n### ' },
        {separator:'---------------'},
        {name : _t('预览模式'), openWith:function(){
            $('.markItUpButton10 a').toggleClass('cur');
            $('#markItUpPreviewFrame').toggle();
        }}, 
        {name : _t('清空'), openWith:function(){
            $('#question_detail').val('');
            $('#markItUpPreviewFrames').html('');
        }}
    ]
}

// mIu nameSpace to avoid conflict.
miu = {
    markdownTitle: function(markItUp, char) {
        heading = '';
        n = $.trim(markItUp.selection||markItUp.placeHolder).length;
        for(i = 0; i < n; i++) {
            heading += char;
        }
        return '\n'+heading+'\n';
    }
}
